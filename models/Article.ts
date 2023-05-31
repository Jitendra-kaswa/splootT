import mongoose, {Schema} from "mongoose";

const articleSchema = new Schema({
    title: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
});

export const ArticleModel = mongoose.model('Article', articleSchema);