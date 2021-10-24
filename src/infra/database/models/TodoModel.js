import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import Todo from "domain/entities/Todo";

mongoosePaginate.paginate.options = {
  limit: 20,
  useEstimatedCount: false,
  customLabels: {
    totalDocs: "totalDocs",
    docs: "docs",
    limit: "perPage",
    page: "currentPage",
    nextPage: "nextPage",
    prevPage: "prevPage",
    totalPages: "totalPages",
    pagingCounter: "serialNo",
    meta: "pagination",
  },
};

const todoSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["incomplete", "completed"],
      default: "incomplete",
    },
    completed_at: {
      type: Date,
      default: null,
    },
    subject: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    is_important: {
      type: Boolean,
      default: false,
    },
    due_date: {
      type: Date,
      default: null,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
      retainKeyOrder: true,
    },
    toJSON: {
      virtuals: true,
    },
  },
);

// Create a virtual field "user" to automatically retrieve the user who created the Todo
todoSchema.virtual("user", {
  ref: "User",
  localField: "user_id",
  foreignField: "_id",
  justOne: true,
});

todoSchema.loadClass(Todo);

// add pagination plugin
todoSchema.plugin(mongoosePaginate);

export default mongoose.model("Todo", todoSchema);
