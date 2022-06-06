import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({
    collection: 'users',
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    toJSON: {
        getters: true
    }
})

export class User {
    @Prop({
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true
    })
    email: string;

    @Prop({
        type: String,
        required: true,
        minlength: 3,
        maxlength: 128
    })
    name: string;

    @Prop({
        type: String,
        required: false,
        get: value => {
            if (value == null) return null;
            return process.env.APP_URL + "/storage/" + value;
        }
    })
    picture: string;

    @Prop({
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    })
    status: string;

    @Prop({
        type: Date,
        required: false
    })
    birthday: Date;

    @Prop({
        type: Date,
        required: false
    })
    email_verified_at: Date;

    @Prop({
        type: String,
        required: true,
        select: false,
        set: value => {
            return bcrypt.hashSync(value, 10);
        }
    })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);