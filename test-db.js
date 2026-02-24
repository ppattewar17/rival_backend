const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function testConnection() {
  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test a simple query
    const result = await prisma.user.findMany();
    console.log('✅ Query executed successfully!');
    console.log(`Found ${result.length} users`);
    
    await prisma.$disconnect();
    console.log('✅ Database disconnected successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();
