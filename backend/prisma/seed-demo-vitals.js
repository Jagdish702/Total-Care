const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.demoVital.deleteMany({});
  await prisma.demoVital.createMany({
    data: [
      { iconName: 'icoHeart',   label: 'Heart Rate',    value: '98', unit: 'BPM',   chartType: 'heart', displayOrder: 1 },
      { iconName: 'icoGlucose', label: 'Glucose',       value: '92', unit: 'mg/dL', chartType: 'line',  displayOrder: 2 },
      { iconName: 'icoPerson',  label: 'Blood pressure',value: '98', unit: 'BPM',   chartType: 'line',  displayOrder: 3 },
      { iconName: 'icoSleep',   label: 'Sleep',         value: '8',  unit: 'Hr',    value2: '43', unit2: 'Min', chartType: 'line', displayOrder: 4 },
    ],
  });
  console.log('✓ DemoVitals seeded');
}

main().catch(console.error).finally(() => prisma.$disconnect());
