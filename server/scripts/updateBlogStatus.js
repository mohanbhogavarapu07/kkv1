import mongoose from 'mongoose';
import 'dotenv/config';
import BlogPost from '../models/BlogPost.js';

const updateBlogStatus = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const postsToUpdate = [
      "Strategic Rest: Why High-Achievers Need to Master Recovery",
      "Decision Frameworks for Overwhelming Complexity",
      "The Integration Principle: Aligning Professional Excellence and Personal Wellbeing",
      "Project Turnaround: The Mental Models That Rescue Failing Initiatives",
      "The Efficiency Paradox: When Optimization Creates Underperformance"
    ];

    // Update each post individually
    for (const title of postsToUpdate) {
      const result = await BlogPost.updateOne(
        { title },
        { 
          $set: { 
            isPublished: true,
            publishedAt: new Date()
          }
        }
      );
      console.log(`Updated post: ${title} (${result.modifiedCount} modified)`);
    }

    console.log('All posts updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateBlogStatus(); 