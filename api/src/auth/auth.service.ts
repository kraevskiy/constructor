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
			login: dto.login ? dto.login : dto.email
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

	async generateUserData(user: UserModel) {
		const data = await this.userModel.aggregate([
			{
				$match: {
					_id: user._id
				}
			},
			{
				$lookup: {
					from: 'Layout',
					localField: '_id',
					foreignField: 'user',
					as: 'layouts'
				}
			},
			{
				$lookup: {
					from: 'Order',
					localField: '_id',
					foreignField: 'user',
					as: 'orders'
				}
			}
		]);

		return {
			user: {
				email: data[0].email,
				_id: data[0]._id,
				role: data[0].role,
				login: data[0].login
			},
			orders: data[0].orders,
			layouts: data[0].layouts
		};
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
			login: user.login
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
			login: user[0].login
		};
	}

	async editUser(user: EditUserModel, _id: string) {
		const editUser = user;
		if(editUser.password){
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
			login: newUser.login
		};
	}

	async getAll(): Promise<UserModel[] | null> {
		return this.userModel.aggregate([
			{
				$facet: {
					count: [
						{
							$count: 'totalCount'
						}
					],
					users: [
						{
							$lookup: {
								from: 'Layout',
								localField: '_id',
								foreignField: 'user',
								as: 'layouts'
							}
						},
						{
							$lookup: {
								from: 'Order',
								localField: '_id',
								foreignField: 'user',
								as: 'orders'
							}
						}
					]
				}
			}
		]).exec();
	}
}
