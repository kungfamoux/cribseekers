import { PrismaClient, RoleType, UserStatus, ListingType, PropertyStatus, PropertyCondition } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  // Allow seeding in production for test data
  // if (process.env.NODE_ENV === 'production') {
  //   throw new Error('Refusing to run seed script in production');
  // }

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
  const userIds: Record<string, string> = {};
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

    userIds[userData.roleName] = user.id;

    // Get the role
    const role = await prisma.role.findUnique({
      where: { name: userData.roleName },
    });

    if (role) {
      // Remove existing roles for this user
      await prisma.userRole.deleteMany({
        where: { userId: user.id },
      });

      // Assign correct role to user
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: role.id,
        },
      });
    }

    console.log(`✅ Created/updated user: ${userData.email} with role: ${userData.roleName}`);
  }

  // Create property categories, types, purposes, and locations
  console.log('🏠 Creating property-related data...');

  const category = await prisma.propertyCategory.upsert({
    where: { name: 'Residential' },
    update: {},
    create: { name: 'Residential', description: 'Residential properties' },
  });

  const type = await prisma.propertyType.upsert({
    where: { name: 'Apartment' },
    update: {},
    create: { name: 'Apartment', description: 'Apartment units' },
  });

  const purpose = await prisma.propertyPurpose.upsert({
    where: { name: 'RENT' },
    update: {},
    create: { name: 'RENT', description: 'For rent' },
  });

  const location1 = await prisma.propertyLocation.upsert({
    where: { id: 'test-location-1' },
    update: {},
    create: {
      id: 'test-location-1',
      propertyId: 'test-property-1',
      city: 'Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      address: 'Victoria Island, Lagos',
      latitude: 6.4281,
      longitude: 3.4219,
    },
  });

  const location2 = await prisma.propertyLocation.upsert({
    where: { id: 'test-location-2' },
    update: {},
    create: {
      id: 'test-location-2',
      propertyId: 'test-property-2',
      city: 'Lagos',
      state: 'Lagos',
      country: 'Nigeria',
      address: 'Lekki Phase 1, Lagos',
      latitude: 6.4344,
      longitude: 3.4472,
    },
  });

  // Create test properties
  console.log('�️ Creating test properties...');

  const property1 = await prisma.property.upsert({
    where: { id: 'test-property-1' },
    update: {},
    create: {
      id: 'test-property-1',
      title: 'Modern 3-Bedroom Apartment in Victoria Island',
      description: 'Beautiful modern apartment in the heart of Victoria Island with stunning city views. Features include spacious living areas, modern kitchen, and premium finishes.',
      price: 2500000,
      currency: 'NGN',
      pricePeriod: 'YEARLY',
      bedrooms: 3,
      bathrooms: 2,
      squareMeters: 120,
      yearBuilt: 2020,
      parkingSpaces: 2,
      floors: 1,
      listingType: ListingType.RENT,
      condition: PropertyCondition.NEW,
      status: PropertyStatus.PUBLISHED,
      visibility: 'PUBLIC',
      categoryId: category.id,
      typeId: type.id,
      purposeId: purpose.id,
      locationId: location1.id,
      ownerId: userIds['LANDLORD'],
      views: 150,
      inquiries: 12,
      featuredUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  const property2 = await prisma.property.upsert({
    where: { id: 'test-property-2' },
    update: {},
    create: {
      id: 'test-property-2',
      title: 'Luxury 2-Bedroom Penthouse in Lekki',
      description: 'Stunning penthouse with panoramic views of the Atlantic Ocean. Features include private terrace, modern kitchen, and premium amenities.',
      price: 3500000,
      currency: 'NGN',
      pricePeriod: 'YEARLY',
      bedrooms: 2,
      bathrooms: 2,
      squareMeters: 150,
      yearBuilt: 2021,
      parkingSpaces: 2,
      floors: 2,
      listingType: ListingType.RENT,
      condition: PropertyCondition.NEW,
      status: PropertyStatus.PUBLISHED,
      visibility: 'PUBLIC',
      categoryId: category.id,
      typeId: type.id,
      purposeId: purpose.id,
      locationId: location2.id,
      ownerId: userIds['LANDLORD'],
      views: 200,
      inquiries: 18,
      featuredUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    },
  });

  // Add property images
  await prisma.propertyImage.upsert({
    where: { id: 'test-image-1' },
    update: {},
    create: {
      id: 'test-image-1',
      propertyId: property1.id,
      url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      isPrimary: true,
      order: 0,
    },
  });

  await prisma.propertyImage.upsert({
    where: { id: 'test-image-2' },
    update: {},
    create: {
      id: 'test-image-2',
      propertyId: property2.id,
      url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
      isPrimary: true,
      order: 0,
    },
  });

  console.log('✅ Created test properties');

  console.log('�� Database seed completed successfully!');
  console.log('\n📝 Test User Credentials:');
  console.log('==============================');
  testUsers.forEach((user) => {
    console.log(`${user.roleName}:`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Password: Test123456!`);
    console.log(`  Phone: ${user.phoneNumber}`);
    console.log('');
  });
  console.log('🏠 Test Properties:');
  console.log('==================');
  console.log('1. Modern 3-Bedroom Apartment in Victoria Island');
  console.log('2. Luxury 2-Bedroom Penthouse in Lekki');
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

