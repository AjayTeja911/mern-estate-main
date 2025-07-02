import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

let bucket;

export const connectGridFS = () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
  return bucket;
};

export const getBucket = () => bucket;