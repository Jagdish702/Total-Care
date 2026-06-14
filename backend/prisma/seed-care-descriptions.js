const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DESCRIPTIONS = {
  doctor:    'Care that shows up when you need it most. Connect with the right doctor, without the wait. With your story already understood, conversations feel easier, decisions feel clearer—and you feel taken care of.',
  ai:        'Care that stays one step ahead. By spotting patterns early, it turns complexity into clear actions—so you move forward with confidence.',
  concierge: 'From rapid ambulance support to real-time intervention, help is already on the way—when seconds matter most. No waiting, no uncertainty. Just immediate, reliable care when you need it most.',
  diet:      'Care that adapts to how you live, eat, and feel. Built around your habits, medical history, and goals, so every meal has a purpose. No rigid charts, no one-size-fits-all plans. Just smart, evolving nutrition that fits your life.',
  device:    'Care that connects every signal into one clear story. From wearables to health apps, your data flows into a single system—so nothing gets lost. No scattered insights, no manual tracking.',
  medicines: 'Care that moves as fast as your needs. From prescriptions to diagnostics, everything is handled end-to-end—right from your home. No delays, no confusion. Just timely care that shows up when it matters most.',
};

async function main() {
  for (const [id, description] of Object.entries(DESCRIPTIONS)) {
    await prisma.careService.update({ where: { id }, data: { description } });
    console.log(`  ✓ ${id}`);
  }
  console.log('Done.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
