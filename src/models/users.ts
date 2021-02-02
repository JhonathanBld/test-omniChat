import mongoose, {Document, model, Schema} from 'mongoose';
import bcryptjs  from 'bcryptjs';

interface IUser extends Document {
    name?: string;
    email?: string;
    password?: string;
}

const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, select: false},
    createdAt: {type: Date, default: Date.now()},
});

UserSchema.pre('save' , function(this: IUser, next: any): void {
    const user = this;
    if (!user.isModified('password')) return next();
    bcryptjs.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcryptjs.hash((user.password || ''), salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });

});

export default model('User', UserSchema);
