import User from '../models/user.model.js';
import Practice from '../models/practice.model.js';
import mongoose from 'mongoose';

const getMyPageData = async (userId) => {
        const uid = mongoose.Types.ObjectId(userId);

        const profile = await User.findById(uid)
        .select("nickname tier points createdAt lastLogin isProfileComplete")
        .lean();

        const practiceList = await Practice.find({ user: uid })
        .populate({ path: 'problem', select: 'title type difficulty' })
        .select("problem result score usedHint solvedAt")
        .sort({ solvedAt: -1 })
        .limit(100)
        .lean();

        const total = await Practice.countDocuments({ user: uid });
        const successCount = await Practice.countDocuments({ user: uid, result: 'success' });
        const successRate = total === 0 ? 0 : +(successCount / total).toFixed(4);

        const typeStats = await Practice.aggregate([
                { $match: { user: uid } },
                { $lookup: {
                        from: 'problems',
                        localField: 'problem',
                        foreignField: '_id',
                        as: 'problem'
                },
        },
                { $unwind: '$problem' },
                { $group: {
                        _id: '$problem.type',
                        total: { $sum: 1 },
                        successCount: { $sum: { $cond: [{ $eq: ['$result', 'success'] }, 1, 0] } }
                },
        },
                { $project: {
                        _id: 0,
                        type : '$_id',
                        total: 1,
                        success: 1,
                        progress : { $cond: [{ $eq: ['$total', 0] }, 0, { $round: [{ $multiply: [{ $divide: ['$successCount', '$total'] }, 100] }, 2] }] }
                },
        } 
        ]);

        return { profile, progress: {
                total,
                successCount,
                successRate,
                typeStats
        }, practiceList };
};