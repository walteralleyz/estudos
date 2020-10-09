import mongoose from "mongoose";
import authorModel from "./author.js";

const resolvers = {
    Query: {
	author: () => {
	    return authorModel.find({});
	    //return authors
	},
	authors: (root, {id}) => {
	   return authorModel.findOne({id});
	   //return authors.find(author => author.id === id);
	}
    },

    Mutation: {
	addAuthor: (root, {name, age, books}) => {
	    const author = new authorModel({age, name, books});
	    return author.save();
	},
	deleteAuthor: (root, {id}) => {
	    return authorModel.findOneAndRemove({id});
	},
	updateAuthor: (root, {id, name}) => {
	    return authorModel.findOneAndUpdate({id}, {name});
	}
    }
};

export default resolvers;
