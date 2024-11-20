import mongoose from "mongoose";
import connectDB from "../config/db";
import Post from "../models/post.model";
import { User, IUser } from "../models/user.model";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";

dotenv.config();

const config = {
  users: {
    admins: 2,
    authors: 10,
    regularUsers: 20,
  },
  posts: {
    minPerAuthor: 5,
    maxPerAuthor: 15,
  },
};

function generateUserData(role: "admin" | "author" | "user"): Partial<IUser> {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password: "Password123!",
    role,
    bio: role === "user" ? undefined : faker.person.bio(),
    avatarUrl: faker.image.avatar(),
    socialLinks: {
      twitter:
        role !== "user"
          ? `https://twitter.com/${faker.internet.username()}`
          : undefined,
      github:
        role === "admin"
          ? `https://github.com/${faker.internet.username()}`
          : undefined,
      linkedin:
        role !== "user"
          ? `https://linkedin.com/in/${faker.internet.username()}`
          : undefined,
    },
    preferences: {
      emailNotifications: faker.datatype.boolean(),
      darkMode: faker.datatype.boolean(),
      newsletter: faker.datatype.boolean(),
    },
    isEmailVerified: role === "admin" ? true : faker.datatype.boolean(),
    lastLogin: faker.date.recent(),
  };
}

function generateMarkdownContent(): string {
  return [
    `# ${faker.lorem.sentence()}\n\n`,
    faker.lorem.paragraphs(2) + "\n\n",
    `## ${faker.lorem.sentence()}\n\n`,
    faker.lorem.paragraphs(2) + "\n\n",
    "- " + faker.lorem.sentence() + "\n",
    "- " + faker.lorem.sentence() + "\n",
    "- " + faker.lorem.sentence() + "\n\n",
    `> ${faker.lorem.paragraph()}\n\n`,
    "```javascript\n" +
      `const ${faker.hacker.noun()} = ${faker.hacker.verb()}('${faker.hacker.adjective()}');\n` +
      "```\n\n",
    `![${faker.lorem.words(3)}](${faker.image.url()})\n\n`,
    faker.lorem.paragraphs(1),
  ].join("");
}

async function generatePostsForUser(userId: mongoose.Types.ObjectId) {
  const postCount = faker.number.int({
    min: config.posts.minPerAuthor,
    max: config.posts.maxPerAuthor,
  });

  return Array.from({ length: postCount }, () => {
    const title = faker.lorem.sentence();
    const isPublished = Math.random() > 0.2;

    return {
      title,
      slug: faker.helpers.slugify(title.toLowerCase()),
      content: generateMarkdownContent(),
      excerpt: faker.lorem.paragraph(),
      coverImage: faker.image.url(),
      author: userId,
      tags: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, () =>
        faker.word.noun(),
      ),
      status: isPublished ? "published" : "draft",
      publishedAt: isPublished ? faker.date.past() : undefined,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
  });
}

async function seedDatabase() {
  try {
    // await mongoose.connect(process.env.MONGODB_URI as string);
    await connectDB();

    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log("Cleared existing data");

    // Create admin users
    const adminPromises = Array.from({ length: config.users.admins }, () =>
      User.create(generateUserData("admin")),
    );
    const admins = await Promise.all(adminPromises);

    // Create authors
    const authorPromises = Array.from({ length: config.users.authors }, () =>
      User.create(generateUserData("author")),
    );
    const authors = await Promise.all(authorPromises);

    // Create regular users
    const userPromises = Array.from({ length: config.users.regularUsers }, () =>
      User.create(generateUserData("user")),
    );
    const regularUsers = await Promise.all(userPromises);

    // Create test users
    const testUsers = await User.create([
      {
        name: "Test Admin",
        email: "admin@example.com",
        password: "Admin123!",
        role: "admin",
        isEmailVerified: true,
      },
      {
        name: "Test Author",
        email: "author@example.com",
        password: "Author123!",
        role: "author",
        isEmailVerified: true,
      },
      {
        name: "Test User",
        email: "user@example.com",
        password: "User123!",
        role: "user",
        isEmailVerified: true,
      },
    ]);

    // Generate posts for authors and admins
    const contentCreators = [...admins, ...authors, testUsers[0], testUsers[1]];
    const allPosts = [];

    for (const user of contentCreators) {
      const userPosts = await generatePostsForUser(user.id);
      const testPosts = await Post.create(userPosts);
    }

    // await Post.insertMany(allPosts);

    // Print summary
    console.log("\nSeeding completed:");
    console.log(`Created ${admins.length} admins`);
    console.log(`Created ${authors.length} authors`);
    console.log(`Created ${regularUsers.length} regular users`);

    console.log("\nTest Users:");
    testUsers.forEach((user) => {
      console.log(`${user.role.toUpperCase()}:`);
      console.log(`Email: ${user.email}`);
      console.log(`Password: ${user.password}\n`);
    });

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();

const seedPosts = async () => {
  await connectDB();

  // Clear existing posts
  await Post.deleteMany({});

  // Sample posts
  const posts = [
    { title: "First Post", content: "This is the first seeded post." },
    { title: "Second Post", content: "This is the second seeded post." },
    { title: "Third Post", content: "This is the third seeded post." },
  ];

  // Insert sample posts
  await Post.insertMany(posts);
  console.log("Database seeded with posts");

  mongoose.connection.close();
};
