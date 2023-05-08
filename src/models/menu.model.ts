import mongoose from 'mongoose';

export interface IMenu extends mongoose.Document {
  effects: mongoose.Types.ObjectId[];
  categories: mongoose.Types.ObjectId[];
  weights: mongoose.Types.ObjectId[];
}

const menuSchema = new mongoose.Schema(
  {
    effects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Effect' }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    weights: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Weight' }],
  },
  {
    timestamps: true,
  },
);

const MenuModel = mongoose.model<IMenu>('Menu', menuSchema);

export default MenuModel;
