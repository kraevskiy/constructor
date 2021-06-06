import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { EditUserModel, UserModel } from './user.model';
import { InjectModel } from 'nestjs-typegoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constans';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { LayoutModel } from '../layout/layout.model';
import { OrderModel } from '../order/order.model';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		@InjectModel(LayoutModel) private readonly layoutModel: ModelType<LayoutModel>,
		@InjectModel(OrderModel) private readonly orderModel: ModelType<OrderModel>,
		private readonly jwtService: JwtService) {
	}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const newUser = new this.userModel({
			email: dto.email,
			passwordHash: await hash(dto.password, salt),
			role: dto.role ? dto.role : 'user'
		});
		return newUser.save();
	}

	async findUser(email: string): Promise<DocumentType<UserModel>[] | []> {
		return this.userModel.find({email}).exec();
	}

	async validateUser(email: string, password: string): Promise<DocumentType<UserModel>> {
		const user = await this.findUser(email);
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
		const layouts = await this.layoutModel.find({user: user._id}).exec();
		const orders = await this.orderModel.find({user: {_id: user._id, email: user.email}}).exec();

		return {
			user: {
				info: {
					email: user.email,
					role: user.role,
					_id: user._id,
					login: user.login
				},
				layouts,
				orders
			}
		};
	}

	async login(user: UserModel) {
		const payload = {
			email: user.email,
			_id: user._id,
			role: user.role,
			login: user.login
		};

		const layouts = await this.layoutModel.find({user: user._id}).exec();
		const orders = await this.orderModel.find({user}).exec();

		return {
			access_token: await this.jwtService.signAsync(payload),
			user: {
				info: {
					email: user.email,
					role: user.role,
				},
				layouts,
				orders
			}
		};
	}

	async editUser(user: EditUserModel, _id: Types.ObjectId) {
		const newUser = await this.userModel.findOneAndUpdate({_id}, user, {new: true}).exec();
		if(!newUser) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}
		return this.generateUserData(newUser);
	}
}
