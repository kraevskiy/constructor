import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { EditUserModel, UserModel } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constans';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService) {
	}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const newUser = new this.userModel({
			email: dto.email,
			passwordHash: await hash(dto.password, salt),
			role: dto.role ? dto.role : 'user',
			login: dto.login ? dto.login : dto.email,
			address: dto.address ? dto.address: '',
			firstName: dto.firstName ? dto.firstName: '',
			lastName: dto.lastName ? dto.lastName: '',
			phone: dto.phone ? dto.phone: '',
			avatar: dto.avatar ? dto.avatar: ''
		});
		return newUser.save();
	}

	async findUserByEmail(email: string): Promise<DocumentType<UserModel>[] | []> {
		return this.userModel.find({email}).exec();
	}

	async validateUser(email: string, password: string): Promise<DocumentType<UserModel>> {
		const user = await this.findUserByEmail(email);
		if (!user?.length) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		const isCorrectPassword = await compare(password, user[0].passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}
		return user[0];
	}

	async delete(guard: { _id: string, email: string }) {

		return this.userModel.findOneAndDelete(guard);
	}

	async login(user: UserModel) {
		const payload = {
			email: user.email,
			_id: user._id,
			role: user.role
		};
		const token = await this.jwtService.signAsync(payload);
		return {
			access_token: token,
			email: user.email,
			_id: user._id,
			role: user.role,
			login: user.login,
			address: user.address,
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			avatar: user.avatar
		};
	}

	async autoLogin(email: string) {
		const user = await this.findUserByEmail(email);

		const payload = {
			email: user[0].email,
			_id: user[0]._id,
			role: user[0].role
		};
		const token = await this.jwtService.signAsync(payload);
		return {
			access_token: token,
			email: user[0].email,
			_id: user[0]._id,
			role: user[0].role,
			login: user[0].login,
			address: user[0].address,
			firstName: user[0].firstName,
			lastName: user[0].lastName,
			phone: user[0].phone,
			avatar: user[0].avatar
		};
	}

	async editUser(user: EditUserModel, _id: string) {
		const editUser = user;
		if (editUser.password) {
			const salt = await genSalt(10);
			editUser.passwordHash = await hash(editUser.password, salt);
		}
		delete editUser.password;
		const newUser = await this.userModel.findOneAndUpdate({_id}, editUser, {new: true}).exec();
		if (!newUser) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		const payload = {
			email: newUser.email,
			_id: newUser._id,
			role: newUser.role
		};
		const token = await this.jwtService.signAsync(payload);
		return {
			access_token: token,
			email: newUser.email,
			_id: newUser._id,
			role: newUser.role,
			login: newUser.login,
			address: newUser.address,
			firstName: newUser.firstName,
			lastName: newUser.lastName,
			phone: newUser.phone,
			avatar: newUser.avatar
		};
	}

	async getAll(): Promise<UserModel[] | null> {
		return this.userModel.aggregate([
			{
				$sort: {
					_id: 1
				}
			},
			{
				$unset: 'passwordHash'
			}
		]).exec();
	}
}
