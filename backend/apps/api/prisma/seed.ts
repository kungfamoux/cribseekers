import { PrismaClient, RoleType, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Refusing to run seed script in production');
  }

  console.log('🌱 Starting database seed...');

  // Hash password for all test users
  const hashedPassword = await bcrypt.hash('Test123456!', 10);

  // Create or update roles
  const roles = [
    { name: 'TENANT', type: RoleType.TENANT, description: 'Regular tenant user' },
    { name: 'LANDLORD', type: RoleType.LANDLORD, description: 'Property owner' },
    { name: 'AGENT', type: RoleType.AGENT, description: 'Real estate agent' },
    { name: 'AGENCY_ADMIN', type: RoleType.AGENCY_ADMIN, description: 'Agency administrator' },
    { name: 'SUPPORT_ADMIN', type: RoleType.SUPPORT_ADMIN, description: 'Support administrator' },
    { name: 'SUPER_ADMIN', type: RoleType.SUPER_ADMIN, description: 'Super administrator' },
  ];

  console.log('📋 Creating roles...');
  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: {
        name: role.name,
        type: role.type,
        description: role.description,
        isSystem: true,
      },
    });
  }

  // Create test users for each role
  const testUsers = [
    {
      email: 'tenant@test.com',
      firstName: 'Test',
      lastName: 'Tenant',
      phoneNumber: '+2348000000001',
      roleName: 'TENANT',
    },
    {
      email: 'landlord@test.com',
      firstName: 'Test',
      lastName: 'Landlord',
      phoneNumber: '+2348000000002',
      roleName: 'LANDLORD',
    },
    {
      email: 'agent@test.com',
      firstName: 'Test',
      lastName: 'Agent',
      phoneNumber: '+2348000000003',
      roleName: 'AGENT',
    },
    {
      email: 'agency@test.com',
      firstName: 'Test',
      lastName: 'AgencyAdmin',
      phoneNumber: '+2348000000004',
      roleName: 'AGENCY_ADMIN',
    },
    {
      email: 'support@test.com',
      firstName: 'Test',
      lastName: 'SupportAdmin',
      phoneNumber: '+2348000000005',
      roleName: 'SUPPORT_ADMIN',
    },
    {
      email: 'super@test.com',
      firstName: 'Test',
      lastName: 'SuperAdmin',
      phoneNumber: '+2348000000006',
      roleName: 'SUPER_ADMIN',
    },
  ];

  console.log('👤 Creating test users...');
  for (const userData of testUsers) {
    // Create or update user
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        password: hashedPassword,
        status: UserStatus.ACTIVE,
        emailVerified: true,
        phoneVerified: true,
      },
      create: {
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        status: UserStatus.ACTIVE,
        emailVerified: true,
        phoneVerified: true,
      },
    });

    // Get the role
    const role = await prisma.role.findUnique({
      where: { name: userData.roleName },
    });

    if (role) {
      // Assign role to user
      await prisma.userRole.upsert({
        where: {
          userId_roleId: {
            userId: user.id,
            roleId: role.id,
          },
        },
        update: {},
        create: {
          userId: user.id,
          roleId: role.id,
        },
      });
    }

    console.log(`✅ Created/updated user: ${userData.email} with role: ${userData.roleName}`);
  }

  console.log('🎉 Database seed completed successfully!');
  console.log('\n📝 Test User Credentials:');
  console.log('==============================');
  testUsers.forEach((user) => {
    console.log(`${user.roleName}:`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Password: Test123456!`);
    console.log(`  Phone: ${user.phoneNumber}`);
    console.log('');
  });
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

