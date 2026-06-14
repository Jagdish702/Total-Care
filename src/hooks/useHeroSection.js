import { useState, useEffect } from 'react';
import { heroSectionApi } from '../services/api';

const FALLBACK = {
  heading:                   'Total Care',
  subheading:                'Health Tracking meets Real world Healthcare',
  ctaPrimary:                'View Plans',
  ctaSecondary:              'How it Works',
  prescriptionsCount:        15,
  labTestsCount:             9,
  allergiesCount:            4,
  allergyItems:              ['Penicillin', "Plant's oil (urushiol)", 'Cephalosporins', 'Aspirin'],
  nutritionMealType:         'Breakfast',
  nutritionFoodName:         'Poha',
  nutritionCalories:         320,
  nutritionCalorieUnit:      'KCAL',
  nutritionRecommendation:   'Low Oil Recommended',
  nutritionRecommendationTip:'Keep peanuts light. Add veggies for fiber.',
  nutritionFoodImageUrl:     null,
  emergencyAmbulanceTime:    '30',
  emergencyConciergeTime:    '30',
  emergencyContactName:      'Aaditya',
  emergencyContactRelation:  'Son',
  healthSyncTitle:           'Auto Health Sync',
  healthSyncDescription:     'Connect Apple / Google Health connect for real-time tracking, no manual input.',
  healthSyncProfileImageUrl: null,
  healthDevicesTitle:        'Health Devices',
  healthDevicesDescription:  'Save more, same care at low cost',
  healthDevicesImageUrl:     null,
};

export function useHeroSection() {
  const [data, setData] = useState(FALLBACK);

  useEffect(() => {
    heroSectionApi.get()
      .then(d => { if (d) setData({ ...d, allergyItems: d.allergyItems ?? FALLBACK.allergyItems }); })
      .catch(() => {});
  }, []);

  return data;
}
