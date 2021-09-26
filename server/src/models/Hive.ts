import { model, Schema } from 'mongoose';

import { IHive, IProductionTotal } from './interfaces/hives';

const totals = new Schema<IProductionTotal>({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  total: Number,
});
const scheme = new Schema<IHive>({
  userID: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, required: true },
  installationDate: { type: Date, required: true },
  totalHarvests: Number,
  productionTotals: [totals],
});

export default model<IHive>("Hive", scheme);
