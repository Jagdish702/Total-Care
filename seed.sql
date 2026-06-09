-- ============================================================
-- CUREBAY TOTALCARE â€” SEED DATA
-- Run AFTER schema.sql
-- ============================================================

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- PRODUCTS â€” Individual Devices
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO products (id, name, subtitle, description, price, original_price, rating, review_count, features_title, product_type, display_order) VALUES
('bp',      'Blood Pressure Monitor',  'Omron HEM-7140T1-AP BP Monitor',  'Clinically validated BP monitoring with IntelliSenseâ„¢ technology, Bluetooth connectivity, and one-touch simplicity for daily use.', 2000, 2560, 4.8, 1087, 'Captures cardiovascular vital parameters:', 'individual', 1),
('glucose', 'Glucose Monitor',         'RGB GlucoBuddy BLE Glucometer',       'Fast, accurate blood glucose tracking with Bluetooth, 900-test memory, and meal-time logging for smarter diabetes care.',          1000, 1600, 4.6, 489,  'Captures diabetes monitoring parameters:',     'individual', 2),
('scale',   'Body Composition Scale',  'MEDITIVE Body Composition Scale',             'Go beyond weight. Track BMI, body fat, muscle mass, metabolism, and hydration with an app-connected precision scale.',            1000, 2999, 4.5, 312,  'Captures multiple body composition parameters:', 'individual', 3);

-- PRODUCTS â€” Bundles
INSERT OR IGNORE INTO products (id, name, subtitle, description, price, original_price, rating, review_count, features_title, product_type, display_order) VALUES
('complete-essentials', 'Complete health essentials',      'Omron HEM-7140T1-AP BP Monitor + RGB GlucoBuddy BLE Glucometer + MEDITIVE Body Composition Scale', 'Comprehensive health monitoring for the whole family â€” blood pressure, blood sugar, and body composition, all connected to Total Care.', 3899, 7159, 4.8, 1240, 'Tracks all essential everyday health indicators:', 'bundle', 4),
('bp-essentials',       'Blood pressure care essentials',  'Omron HEM-7140T1-AP BP Monitor + MEDITIVE Body Composition Scale', 'Monitor blood pressure and body composition together for a complete cardiovascular health picture, every single day.',                  2899, 5559, 4.7, 892,  'Tracks key cardiovascular and body health indicators:', 'bundle', 5),
('diabetes-essentials', 'Diabetes care essentials',        'RGB GlucoBuddy BLE Glucometer + MEDITIVE Body Composition Scale', 'Track blood glucose and body composition with Bluetooth-connected devices designed for confident daily diabetes management.',           1999, 4599, 4.6, 643,  'Tracks key diabetes and body health indicators:',  'bundle', 6);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- PRODUCT FEATURES
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO product_features (product_id, feature_text, display_order) VALUES
('bp', 'Bluetooth Connectivity', 1),
('bp', 'IntelliSenseâ„¢ Technology', 2),
('bp', 'Cuff Wrapping Guide', 3),
('bp', 'Hypertension Indicator', 4),
('bp', 'Irregular Heartbeat Detection', 5),
('bp', 'Pulse Monitoring', 6),
('bp', 'One-touch Operation', 7),
('bp', '14 Reading Memory', 8),
('bp', 'Clinically Validated Accuracy', 9),

('glucose', 'Auto Coding', 1),
('glucose', 'Automatic Strip Ejection', 2),
('glucose', 'FAD-GDH Enzyme Technology', 3),
('glucose', 'Fast Results in 5 Seconds', 4),
('glucose', '900 Test Memory', 5),
('glucose', 'Memory Recall Function', 6),
('glucose', 'Before & After Meal Tracking', 7),
('glucose', 'Compact & Portable Design', 8),
('glucose', 'Small Blood Sample Requirement', 9),

('scale', 'Track weight and body fat together', 1),
('scale', 'Understand fitness progress beyond weight', 2),
('scale', 'Monitor muscle and metabolism changes', 3),
('scale', 'Sync health data to your phone', 4),
('scale', 'Track progress for the whole family', 5),
('scale', 'Accurate readings with automatic tracking', 6),

('complete-essentials', 'Blood sugar, BP & pulse monitoring', 1),
('complete-essentials', 'Before & after meal sugar tracking', 2),
('complete-essentials', 'Irregular heartbeat & hypertension alerts', 3),
('complete-essentials', 'Fast glucose results in 5 seconds', 4),
('complete-essentials', 'Weight, BMI & body fat tracking', 5),
('complete-essentials', 'Muscle mass, metabolism & hydration insights', 6),
('complete-essentials', 'Bluetooth-connected health tracking', 7),
('complete-essentials', 'Multi-device monitoring for the whole family', 8),

('bp-essentials', 'Blood pressure & pulse monitoring', 1),
('bp-essentials', 'Irregular heartbeat detection', 2),
('bp-essentials', 'Hypertension indication alerts', 3),
('bp-essentials', 'Clinically validated accuracy', 4),
('bp-essentials', 'Bluetooth app connectivity', 5),
('bp-essentials', 'One-touch easy operation', 6),
('bp-essentials', 'Weight, BMI & body fat tracking', 7),
('bp-essentials', 'Muscle mass, metabolism & hydration insights', 8),

('diabetes-essentials', 'Fast blood sugar results in 5 seconds', 1),
('diabetes-essentials', 'Before & after meal sugar tracking', 2),
('diabetes-essentials', '900 test memory with recall', 3),
('diabetes-essentials', 'Auto coding & strip ejection', 4),
('diabetes-essentials', 'Weight, BMI & body fat tracking', 5),
('diabetes-essentials', 'Muscle mass, metabolism & hydration insights', 6),
('diabetes-essentials', 'Bluetooth health data sync', 7),
('diabetes-essentials', 'Compact daily-use monitoring setup', 8);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- PRODUCT BUNDLE ITEMS
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO product_bundle_items (bundle_id, component_id, display_order) VALUES
('complete-essentials', 'bp',      1),
('complete-essentials', 'glucose', 2),
('complete-essentials', 'scale',   3),
('bp-essentials',       'bp',      1),
('bp-essentials',       'scale',   2),
('diabetes-essentials', 'glucose', 1),
('diabetes-essentials', 'scale',   2);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- HEALTH CONCERNS
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO health_concerns (id, label, display_order) VALUES
('bp',         'High Blood Pressure',              1),
('family',     'Family Health Monitoring',          2),
('weight',     'Weight Gain / Loss Tracking',       3),
('preventive', 'Preventive Health Check',           4),
('sugar',      'Mild / Occasional Sugar Monitoring', 5),
('post-diag',  'Post-Diagnosis Care',               6);

INSERT OR IGNORE INTO concern_recommendations (concern_id, product_id, display_order) VALUES
('bp',         'bp',                  1),
('family',     'complete-essentials', 1),
('weight',     'scale',               1),
('preventive', 'bp-essentials',       1),
('sugar',      'glucose',             1),
('post-diag',  'diabetes-essentials', 1);

INSERT OR IGNORE INTO concern_description_parts (concern_id, part_text, is_highlighted, display_order) VALUES
('bp',    'You need to keep a close eye on your blood pressure every day.',                                                     1, 1),
('bp',    'Regular tracking helps you catch changes early and stay in control before it turns serious.',                         0, 2),
('sugar', 'Occasional sugar spikes deserve attention.',                                                                         1, 1),
('sugar', 'A glucometer helps you monitor levels without making it your whole day.',                                            0, 2);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- SUBSCRIPTION PLANS
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO subscription_plans (id, title, plan_type, original_price, discounted_price, price_period, subtitle, title_color, cta_text, display_order, is_featured) VALUES
('quarterly', 'Quarterly Plan', 'quarterly', 199,  99,  'month', 'Flexible monthly continuation', '#d29300', 'Get Started at â‚¹297', 1, 0),
('yearly',    'Yearly plan',    'yearly',    1999, 999, 'year',  'Best value for long-term care',  '#00b2dd', 'Get Started at â‚¹999', 2, 1);

INSERT OR IGNORE INTO subscription_description_lines (plan_id, line_text, display_order) VALUES
('quarterly', 'First 3 months billed at â‚¹297, then â‚¹99/month.', 1),
('quarterly', 'Save upto â‚¹300 on your dedicated care',           2),
('yearly',    'Billed yearly.',                                   1),
('yearly',    'Save upto â‚¹1,000 on your dedicated care.',         2);

INSERT OR IGNORE INTO subscription_features (feature_text, icon_name, display_order) VALUES
('Ambulance within 30 minutes',                 'ambulanceIcon',  1),
('Specialist consultation within 48 hours',      'specialistIcon', 2),
('Medical Concierge within 30 minutes',          'conciergeIcon',  3),
('Family doctor call back within 6 hours',       'specialistIcon', 4),
('Medicine delivery within 3 hours',             'medicineIcon',   5);

INSERT OR IGNORE INTO subscription_plan_features (plan_id, feature_id) VALUES
('quarterly', 1), ('quarterly', 2), ('quarterly', 3), ('quarterly', 4), ('quarterly', 5),
('yearly',    1), ('yearly',    2), ('yearly',    3), ('yearly',    4), ('yearly',    5);

INSERT OR IGNORE INTO subscription_price_breakdowns (plan_id, label, original_display, discounted_display, display_order) VALUES
('quarterly', 'First 3 months',  'â‚¹597',   'â‚¹297/month', 1),
('quarterly', 'After 3 months',  'â‚¹199',   'â‚¹99/month',  2),
('yearly',    '12 months access','â‚¹1,999', 'â‚¹999/year',  1);

INSERT OR IGNORE INTO subscription_savings (plan_id, label, value_text, display_order) VALUES
('quarterly', 'â‚¹100/month Ã— 3 months', 'â‚¹300 saved',       1),
('quarterly', 'After 3 months',         'â‚¹100/month Saved', 2),
('yearly',    'â‚¹1000/year',             'â‚¹1,000 saved',     1);

INSERT OR IGNORE INTO subscription_billing_info (plan_id, info_text, display_order) VALUES
('quarterly', 'Billed â‚¹297 today',                  1),
('quarterly', 'Auto-renews monthly at â‚¹99',         2),
('quarterly', 'Cancel anytime before next billing', 3),
('yearly',    'Billed â‚¹999 today',                  1),
('yearly',    'Renews yearly',                      2),
('yearly',    'Cancel anytime before renewal',      3);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- CARE SERVICES
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO care_services (id, label, headline, accent_text, expanded_panel_top, expanded_bullets_top, display_order) VALUES
('doctor',    'Family Doctor Consultation',     'Every Consultation starts', 'with your data',         96,  470, 1),
('ai',        'AI Health Companion',            'Your health, analysed.',    'Before it''s a problem', 348, 529, 2),
('concierge', 'Concierge & Emergency services', 'Help arrives,',             'Before panic does',      105, 502, 3),
('diet',      'Smart Diet Plan',                'Diet that thinks',          'Before you eat.',        282, 470, 4),
('device',    'Device Integrations',            'Stop Tracking,',            'Start Understanding',    286, 528, 5),
('medicines', 'Medicines and Lab tests',        'Medicines & Lab Tests',     'Care Without Delays',    148, 510, 6);

INSERT OR IGNORE INTO service_features (service_id, feature_text, display_order) VALUES
('doctor',    'General physician consultation within 6 hours.',                                              1),
('doctor',    'Specialist consultation within 48 hours.',                                                    2),
('doctor',    'Medical history, trends, Synced. Analysed. Ready.',                                          3),
('doctor',    'So the doctor focuses on decisions, not data collection.',                                    4),
('ai',        'Tracks patterns. Spots risks early.',                                                         1),
('ai',        'Nudges you before things go wrong.',                                                          2),
('ai',        'Converts abstract health goals into measurable metrics.',                                     3),
('concierge', 'Concierge and Ambulance arrives within 30 minutes.',                                         1),
('concierge', 'Help is triggered before you react',                                                          2),
('concierge', 'Real support. Not just alerts',                                                               3),
('diet',      'Builds your health context from daily activity patterns and medical history.',                 1),
('diet',      'Dynamic meal planning based on evolving health goals.',                                       2),
('diet',      'No guesswork. No generic plans. Automated, goal-aligned nutritional planning.',               3),
('device',    'Multiple devices. One system',                                                                1),
('device',    'Signals combined, not scattered',                                                             2),
('device',    'Patterns you can actually act on',                                                            3),
('medicines', 'CureBay Guarantee: Medicines delivered within 3 hours.',                                     1),
('medicines', 'Home test sample collection.',                                                                2),
('medicines', 'Without delays. Without confusion.',                                                          3);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- TESTIMONIALS
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO testimonials (person_name, badge_text, quote, service_id, context, display_order) VALUES
('Kartik Varma',  'Specialist Consultation',    'TotalCare and Dr.Neha Joshi came to my life as my god''s angels, making my life healthier one click away', 'doctor', 'service', 1),
('Ajay Dogra',    'AI powered Health Tracking', 'TotalCare''s AI is basically a divine protector for my vitals. It''s like having a guardian angel who also happens to be a data scientist.', 'ai', 'service', 2),
('Sunita Sharma', 'Ambulance Services',         'As someone who stays on top of their health, TotalCare adds a layer of reassurance I didn''t know I needed.', 'concierge', 'service', 3),
('Ajay Dogra',    'Data Backed Diet Plan',      'TotalCare''s AI is basically a divine protector for my vitals. It''s like having a guardian angel who also happens to be a data scientist.', 'diet', 'service', 4),
('Vikas Basu',    'Activity Tracking',          'TotalCare''s AI acts as a vigilant overseer for my health metrics. It''s akin to having a watchful guardian who is also an expert in data analysis.', 'device', 'service', 5),
('Ruchi Mehta',   'At Home Lab Tests',          'TotalCare''s AI serves as a diligent monitor for my lab results. It''s like having a knowledgeable guardian who specializes in medical data analysis.', 'medicines', 'service', 6);

INSERT OR IGNORE INTO testimonials (person_name, quote, product_id, context, display_order) VALUES
('Rohit Sharma',  'I stopped guessing and began understanding my blood pressure trends. With insights from my monitor and the Total Care app, I can make sense of my readings.',                                     'bp',      'product', 1),
('Ayush Mehta',   'Weight was merely a number in the past, but now I truly understand the changes happening within my body and how they affect my overall health and energy levels.',                              'scale',   'product', 2),
('Neha Kulkarni', 'I used to check my sugar levels but never really understood them fully. Now I can clearly see patterns â€” what affects my levels, what doesn''t, and how to manage them better.',              'glucose', 'product', 3);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- FAQ CATEGORIES
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO faq_categories (name, slug, display_order) VALUES
('General',          'general',  1),
('Devices & Setup',  'devices',  2),
('Services & Plans', 'services', 3);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- FAQS
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO faqs (id, question, answer_type, answer_text, category_id, display_order) VALUES
(1, 'What is CureBay TotalCare?',
    'text',
    'CureBay TotalCare is a smart healthcare service platform that combines connected health devices, AI-powered health insights, doctor consultations, and emergency services into one integrated care plan.',
    1, 1),
(2, 'What services are included in CureBay TotalCare?',      'list',  NULL, 1, 2),
(3, 'Which smart devices can be connected with the TotalCare app?', 'list', NULL, 2, 3),
(4, 'How do I connect a device after purchasing it?',         'steps', NULL, 2, 4),
(5, 'Is there a subscription required to use TotalCare?',
    'text',
    'Yes. Choose a Quarterly plan at â‚¹99/month (billed â‚¹297 for first 3 months) or a Yearly plan at â‚¹999/year. Both plans include the full suite of services.',
    3, 5),
(6, 'How quickly can I get a doctor consultation?',
    'text',
    'A general physician callback is guaranteed within 6 hours. Specialist consultations are available within 48 hours.',
    3, 6),
(7, 'What happens in a medical emergency?',
    'text',
    'TotalCare dispatches a Medical Concierge and Ambulance within 30 minutes. Your emergency contacts are notified automatically.',
    3, 7),
(8, 'Are the devices compatible with Apple Health and Google Health Connect?', 'list', NULL, 2, 8),
(9, 'How are medicines delivered?',
    'text',
    'CureBay guarantees medicine delivery within 3 hours through its pharmacy network. Lab test sample collection is done at home.',
    3, 9);

INSERT OR IGNORE INTO faq_list_items (faq_id, item_text, display_order) VALUES
(2, 'Smart health monitoring through connected devices',                       1),
(2, 'Online doctor consultation and eClinic support',                          2),
(2, 'Diagnostics and lab test booking',                                        3),
(2, 'Medicine ordering support',                                               4),
(2, 'AI-supported health insights',                                            5),
(2, 'Chronic care management â€” Diabetes, Weight, Blood Pressure',             6),
(3, 'Smart Glucometer (RGB GlucoBuddy BLE)',                                   1),
(3, 'Blood Pressure (BP) Monitor (Omron HEM-7140T1-AP)',                       2),
(3, 'Smart Body Composition Scale (MEDITIVE)',                                  3),
(3, 'Other Bluetooth-enabled health devices',                                  4),
(8, 'Yes â€” the TotalCare app supports Apple Health integration on iOS devices.', 1),
(8, 'Google Health Connect is supported on Android devices.',                   2),
(8, 'Once connected, readings sync automatically with no manual entry.',        3);

INSERT OR IGNORE INTO faq_steps (id, faq_id, step_title, display_order) VALUES
(1, 4, 'Step 1: Install the TotalCare App',           1),
(2, 4, 'Step 2: Create / Login to Your Account',      2),
(3, 4, 'Step 3: Turn ON Bluetooth',                   3),
(4, 4, 'Step 4: Add the Device',                      4),
(5, 4, 'Step 5: Start Using the Device',              5);

INSERT OR IGNORE INTO faq_step_items (step_id, item_text, display_order) VALUES
(1, 'Download the app from Android Play Store or iOS App Store',               1),
(2, 'Register using your mobile number and OTP',                               1),
(2, 'Create your health profile',                                              2),
(3, 'Enable Bluetooth on your mobile phone before pairing the device',         1),
(4, 'Open the TotalCare app',                                                  1),
(4, 'Go to Devices or Smart Devices',                                          2),
(4, 'Select your device model',                                                3),
(4, 'Pair the device using Bluetooth',                                         4),
(5, 'Once paired successfully, readings will automatically sync to the app',   1);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- HIGHLIGHT CARDS
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO highlight_cards (label, service_id, overlay_type, display_order) VALUES
('Doctor Consultation',            'doctor',    'records',   1),
('AI Health Companion',            'ai',        'vitals',    2),
('Concierge & Emergency Services', 'concierge', 'emergency', 3),
('Smart Diet Plan',                'diet',      'nutrition', 4),
('Exercise Plans & Tracking',      'device',    'exercise',  5),
('Medicines & Lab Tests',          'medicines', 'lab',       6);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- HEALTH 360 FRAMES
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO health360_frames (id, title_lines, body_text, display_order) VALUES
(1, '["Your Health.", "Connected. Understood."]',
    'All your devices, insights, and care, synced into one continuous health journey.', 0),
(2, '["Unified Device Ecosystem"]',
    'We bring your metrics together. Gain an accurate, consolidated baseline of your vital signs from the devices you already trust.', 1),
(3, '["Precision Insights with CureBay"]',
    'Your raw device data is normalized and transformed into a powerful daily health narrative.', 2),
(4, '["Data-Driven Medical Consultation"]',
    'Your insights don''t stop with you. Your assigned Family Health Doctor and AI Companion turn analysis into action.', 3);

INSERT OR IGNORE INTO health360_frame_bullets (frame_id, bullet_text, display_order) VALUES
(2, 'Clinical Accuracy',            1),
(2, 'Ambient Monitoring',           2),
(2, 'Seamless Integration',         3),
(3, 'Holistic Wellness Score',      1),
(3, 'Deep Trends',                  2),
(3, 'Targeted Alerts',              3),
(4, 'Informed Decisions',           1),
(4, 'Precision Treatment',          2),
(4, 'AI-Orchestrated Action Plan',  3);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- PRODUCT DETAIL TABS
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO product_detail_tabs (id, product_id, tab_label, vitals_layout, latest_reading_label, display_order) VALUES
('omron',      'bp',      'Omron BP Monitor â€“ HEM-7140-AP',  'grid', NULL,             1),
('meditive',   'scale',   'Meditive Body Composition Scale', 'list', 'Today, 8:30 AM', 2),
('glucobuddy', 'glucose', 'RGB GlucoBuddy Glucometer',       'list', 'Today, 8:30 AM', 3);

INSERT OR IGNORE INTO product_detail_vitals (tab_id, icon_name, label, value, unit, value2, unit2, display_order) VALUES
('omron',      'iconHeartFill',    'Heart Rate',      '98',  'BPM',   NULL, NULL,  1),
('omron',      'iconGlucoseStat',  'Glucose',         '92',  'mg/dL', NULL, NULL,  2),
('omron',      'iconPerson',       'Blood pressure',  '98',  'BPM',   NULL, NULL,  3),
('omron',      'iconSleep',        'Sleep',           '8',   'Hr',    '43', 'Min', 4),
('meditive',   'iconScaleMetric',  'Body Weight',     '72.4','kg',    NULL, NULL,  1),
('meditive',   'iconScaleMetric',  'Body Fat',        '21.8','%',     NULL, NULL,  2),
('meditive',   'iconScaleMetric',  'BMI',             '21.8','%',     NULL, NULL,  3),
('glucobuddy', 'iconGlucoseMetric','Glucose',         '142', 'mg/dl', NULL, NULL,  1),
('glucobuddy', 'iconGlucoseMetric','Post-Meal Level', '168', 'mg/dl', NULL, NULL,  2),
('glucobuddy', 'iconGlucoseMetric','Daily Average',   '136', 'mg/dl', NULL, NULL,  3);

INSERT OR IGNORE INTO product_detail_insights (tab_id, icon_name, label, insight_type, insight_text, highlight_value) VALUES
('omron',      'iconBpMetric',      'Blood Pressure',    'paragraph', 'Your BP is slightly elevated today. Consider resting and hydrating.', NULL),
('meditive',   'iconScaleMetric',   'BMI',               'metric',    'improvement. Stay consistent with workouts and hydration',           '40%'),
('glucobuddy', 'iconGlucoseMetric', 'Track Glucose Now', 'metric',    'Time to check your glucose level.',                                  '2:30 PM');

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- PRODUCT SHOWCASE BULLETS
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO product_showcase_bullets (bullet_text, display_order) VALUES
('Simple setup. Smarter monitoring.',    1),
('Native Total Care integration',        2),
('No third-party health hub dependency', 3),
('Clinically validated branded devices', 4),
('Accurate, real-time health tracking',  5),
('Simple setup. No ecosystem lock-in.',  6);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- FOOTER
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO footer_sections (heading, display_order) VALUES
('Company',  1),
('Services', 2),
('Products', 3),
('Legal',    4),
('Support',  5);

INSERT OR IGNORE INTO footer_links (section_id, label, url, display_order) VALUES
(1, 'About Us',         '/about',              1),
(1, 'Careers',          '/careers',            2),
(1, 'Blog',             '/blog',               3),
(1, 'Press',            '/press',              4),
(2, 'Doctor Consult',   '/services/doctor',    1),
(2, 'AI Companion',     '/services/ai',        2),
(2, 'Emergency Care',   '/services/emergency', 3),
(2, 'Diet Planning',    '/services/diet',      4),
(2, 'Lab Tests',        '/services/labs',      5),
(3, 'BP Monitor',       '/products/bp',        1),
(3, 'Glucose Monitor',  '/products/glucose',   2),
(3, 'Body Scale',       '/products/scale',     3),
(3, 'Health Bundles',   '/products',           4),
(4, 'Privacy Policy',   '/privacy',            1),
(4, 'Terms of Service', '/terms',              2),
(4, 'Refund Policy',    '/refunds',            3),
(5, 'Contact Us',       '/contact',            1),
(5, 'Help Center',      '/help',               2),
(5, 'FAQs',             '/faqs',               3);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- NAVIGATION
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO nav_items (label, url, parent_id, display_order) VALUES
('Home',     '/',        NULL, 1),
('Services', '/services',NULL, 2),
('Products', '/products',NULL, 3),
('Plans',    '/plans',   NULL, 4),
('About',    '/about',   NULL, 5),
('Contact',  '/contact', NULL, 6);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- STATUS CARDS
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

-- 38. status_cards â€” card definitions
INSERT OR IGNORE INTO status_cards (id, title, description, icon_name, card_type, linked_product_id, linked_service_id, unit, display_order) VALUES
('blood-pressure',   'Blood Pressure',        'Tracks systolic and diastolic pressure readings from your BP monitor.',          'iconHeartFill',     'health',       'bp',      NULL,        'mmHg',  1),
('blood-glucose',    'Blood Glucose',          'Monitors pre- and post-meal blood sugar levels from your glucometer.',           'iconGlucoseStat',   'health',       'glucose', NULL,        'mg/dL', 2),
('body-weight',      'Body Weight & BMI',      'Tracks weight, BMI, and body-fat percentage from your composition scale.',       'iconScaleMetric',   'health',       'scale',   NULL,        'kg',    3),
('heart-rate',       'Heart Rate',             'Resting heart rate captured automatically during BP readings.',                  'iconHeartFill',     'health',       'bp',      NULL,        'BPM',   4),
('bp-device',        'BP Monitor',             'Connection and sync status of your Omron HEM-7140T1-AP.',                        'iconDevice',        'device',       'bp',      NULL,        NULL,    5),
('glucose-device',   'Glucose Monitor',        'Connection and sync status of your RGB GlucoBuddy glucometer.',                  'iconGlucoseDevice', 'device',       'glucose', NULL,        NULL,    6),
('scale-device',     'Body Composition Scale', 'Connection and sync status of your MEDITIVE scale.',                            'iconScaleDevice',   'device',       'scale',   NULL,        NULL,    7),
('doctor-consult',   'Doctor Consultation',    'Status of your next scheduled or on-demand physician call.',                    'iconDoctor',        'service',      NULL,      'doctor',    NULL,    8),
('concierge',        'Concierge & Emergency',  'Real-time availability of concierge and ambulance dispatch.',                   'iconAmbulance',     'service',      NULL,      'concierge', NULL,    9),
('medicine-delivery','Medicine Delivery',      'Status of your latest medicine or lab-test order.',                             'iconMedicine',      'service',      NULL,      'medicines', NULL,   10),
('subscription',     'Subscription',           'Current plan status, renewal date, and feature access.',                        'iconSubscription',  'subscription', NULL,      NULL,        NULL,   11);

-- 39. status_card_levels â€” per-card level definitions
INSERT OR IGNORE INTO status_card_levels (card_id, level_key, label, description, color_hex, bg_color_hex, icon_name, display_order) VALUES

-- Blood Pressure
('blood-pressure', 'normal',   'Normal',        'Systolic 90â€“120 mmHg and diastolic 60â€“80 mmHg.',          '#00B82E', '#E8F8EE', 'iconCheckCircle', 1),
('blood-pressure', 'elevated', 'Elevated',      'Systolic 120â€“129 mmHg; diastolic below 80 mmHg.',         '#D29300', '#FFF8E1', 'iconAlertCircle', 2),
('blood-pressure', 'warning',  'High â€” Stage 1','Systolic 130â€“139 mmHg or diastolic 80â€“89 mmHg.',          '#FF7A00', '#FFF0E0', 'iconWarning',     3),
('blood-pressure', 'critical', 'High â€” Stage 2','Systolic 140+ mmHg or diastolic 90+ mmHg.',               '#E53935', '#FDECEA', 'iconCritical',    4),
('blood-pressure', 'pending',  'No Reading',    'No recent reading available. Sync your device.',           '#808080', '#F5F5F5', 'iconSync',        5),

-- Blood Glucose
('blood-glucose', 'normal',   'Normal',         'Fasting: 70â€“99 mg/dL. Post-meal: below 140 mg/dL.',       '#00B82E', '#E8F8EE', 'iconCheckCircle', 1),
('blood-glucose', 'warning',  'Pre-diabetic',   'Fasting: 100â€“125 mg/dL. Monitor closely.',                '#FF7A00', '#FFF0E0', 'iconWarning',     2),
('blood-glucose', 'critical', 'High',           'Fasting: 126+ mg/dL. Consult your doctor.',               '#E53935', '#FDECEA', 'iconCritical',    3),
('blood-glucose', 'elevated', 'Post-meal High', 'Post-meal reading above 180 mg/dL.',                      '#D29300', '#FFF8E1', 'iconAlertCircle', 4),
('blood-glucose', 'pending',  'No Reading',     'No recent reading available. Sync your device.',           '#808080', '#F5F5F5', 'iconSync',        5),

-- Body Weight & BMI
('body-weight', 'normal',   'Healthy',          'BMI 18.5â€“24.9. Keep it up!',                              '#00B82E', '#E8F8EE', 'iconCheckCircle', 1),
('body-weight', 'warning',  'Overweight',       'BMI 25â€“29.9. Consider dietary adjustments.',              '#FF7A00', '#FFF0E0', 'iconWarning',     2),
('body-weight', 'critical', 'Obese',            'BMI 30+. Please consult your doctor.',                    '#E53935', '#FDECEA', 'iconCritical',    3),
('body-weight', 'elevated', 'Underweight',      'BMI below 18.5. Nutritional support may help.',           '#D29300', '#FFF8E1', 'iconAlertCircle', 4),
('body-weight', 'pending',  'No Reading',       'No recent reading available. Sync your scale.',           '#808080', '#F5F5F5', 'iconSync',        5),

-- Heart Rate
('heart-rate', 'normal',   'Normal',            'Resting heart rate 60â€“100 BPM.',                          '#00B82E', '#E8F8EE', 'iconCheckCircle', 1),
('heart-rate', 'warning',  'Low (Bradycardia)', 'Resting heart rate below 60 BPM.',                        '#FF7A00', '#FFF0E0', 'iconWarning',     2),
('heart-rate', 'critical', 'High (Tachycardia)','Resting heart rate above 100 BPM.',                       '#E53935', '#FDECEA', 'iconCritical',    3),
('heart-rate', 'pending',  'No Reading',        'No recent reading. Sync your BP monitor.',                '#808080', '#F5F5F5', 'iconSync',        4),

-- Device cards
('bp-device',      'normal',   'Connected',     'Device is paired and syncing data.',                      '#00B82E', '#E8F8EE', 'iconBluetooth',   1),
('bp-device',      'warning',  'Needs Sync',    'Last sync was more than 24 hours ago.',                   '#FF7A00', '#FFF0E0', 'iconSync',        2),
('bp-device',      'inactive', 'Disconnected',  'Device is not paired. Open the app to reconnect.',       '#808080', '#F5F5F5', 'iconBluetoothOff',3),
('glucose-device', 'normal',   'Connected',     'Device is paired and syncing data.',                      '#00B82E', '#E8F8EE', 'iconBluetooth',   1),
('glucose-device', 'warning',  'Needs Sync',    'Last sync was more than 24 hours ago.',                   '#FF7A00', '#FFF0E0', 'iconSync',        2),
('glucose-device', 'inactive', 'Disconnected',  'Device is not paired. Open the app to reconnect.',       '#808080', '#F5F5F5', 'iconBluetoothOff',3),
('scale-device',   'normal',   'Connected',     'Device is paired and syncing data.',                      '#00B82E', '#E8F8EE', 'iconBluetooth',   1),
('scale-device',   'warning',  'Needs Sync',    'Last sync was more than 24 hours ago.',                   '#FF7A00', '#FFF0E0', 'iconSync',        2),
('scale-device',   'inactive', 'Disconnected',  'Device is not paired. Open the app to reconnect.',       '#808080', '#F5F5F5', 'iconBluetoothOff',3),

-- Service cards
('doctor-consult', 'normal',   'Scheduled',     'Your consultation is confirmed.',                         '#00B82E', '#E8F8EE', 'iconCalendar',    1),
('doctor-consult', 'pending',  'Awaiting',      'Callback request placed. Expected within 6 hours.',      '#D29300', '#FFF8E1', 'iconClock',       2),
('doctor-consult', 'inactive', 'Not Scheduled', 'No upcoming consultation. Request one anytime.',         '#808080', '#F5F5F5', 'iconDoctor',      3),
('concierge',      'normal',   'Available',     'Concierge and ambulance are on standby.',                 '#00B82E', '#E8F8EE', 'iconCheckCircle', 1),
('concierge',      'warning',  'Dispatched',    'Help is on the way. ETA under 30 minutes.',               '#FF7A00', '#FFF0E0', 'iconAmbulance',   2),
('concierge',      'inactive', 'Unavailable',   'Service is temporarily unavailable in your area.',       '#808080', '#F5F5F5', 'iconAlertCircle', 3),
('medicine-delivery','normal', 'Delivered',     'Your order has been delivered.',                          '#00B82E', '#E8F8EE', 'iconCheckCircle', 1),
('medicine-delivery','warning','Out for Delivery','Your order is on its way. ETA under 3 hours.',          '#D29300', '#FFF8E1', 'iconDelivery',    2),
('medicine-delivery','pending','Processing',    'Order confirmed. Preparing for dispatch.',                '#808080', '#F5F5F5', 'iconClock',       3),
('medicine-delivery','inactive','No Active Order','No active medicine or lab order.',                      '#808080', '#F5F5F5', 'iconMedicine',    4),

-- Subscription card
('subscription', 'normal',   'Active',          'Your plan is active and all features are unlocked.',     '#00B82E', '#E8F8EE', 'iconCheckCircle', 1),
('subscription', 'warning',  'Expiring Soon',   'Your plan expires within 7 days. Renew to stay covered.','#FF7A00', '#FFF0E0', 'iconClock',       2),
('subscription', 'critical', 'Expired',         'Your plan has expired. Renew now to restore access.',   '#E53935', '#FDECEA', 'iconCritical',    3),
('subscription', 'inactive', 'No Plan',         'You have no active subscription. Choose a plan.',       '#808080', '#F5F5F5', 'iconSubscription',4);

-- Payment status card (card_type = 'payment')
INSERT OR IGNORE INTO status_cards (id, title, description, icon_name, card_type, linked_product_id, linked_service_id, unit, display_order) VALUES
('payment', 'Payment', 'Tracks the real-time status of every payment attempt against an order.', 'iconPayment', 'payment', NULL, NULL, NULL, 12);

-- 7 payment status levels â€” level_key mirrors payments.status CHECK values exactly
INSERT OR IGNORE INTO status_card_levels (card_id, level_key, label, description, color_hex, bg_color_hex, icon_name, display_order) VALUES
('payment', 'normal',      'Successful',  'Payment was authorised and confirmed by the gateway.',                        '#00B82E', '#E8F8EE', 'iconCheckCircle', 1),
('payment', 'critical',    'Failed',      'Payment was declined or rejected. No amount was charged.',                   '#E53935', '#FDECEA', 'iconCritical',    2),
('payment', 'processing',  'Processing',  'Payment submitted to the gateway â€” awaiting confirmation.',                  '#0072CF', '#E3F0FB', 'iconClock',       3),
('payment', 'pending',     'Pending',     'Initiated but not yet submitted â€” e.g. redirected to bank.',                 '#D29300', '#FFF8E1', 'iconAlertCircle', 4),
('payment', 'refunded',    'Refunded',    'Payment successfully reversed. Amount returns within 5â€“7 business days.',    '#7B61FF', '#F0EEFF', 'iconRefund',      5),
('payment', 'cancelled',   'Cancelled',   'User cancelled before completing payment. No amount was charged.',           '#808080', '#F5F5F5', 'iconCancel',      6),
('payment', 'timeout',     'Timeout',     'Gateway or session timed out. Verify with your bank before retrying.',       '#FF7A00', '#FFF0E0', 'iconTimeout',     7);

-- 40. status_card_metrics â€” numeric thresholds per card
INSERT OR IGNORE INTO status_card_metrics (card_id, metric_key, metric_label, metric_unit, normal_min, normal_max, warning_min, warning_max, critical_min, critical_max, display_order) VALUES

-- Blood Pressure
('blood-pressure', 'systolic',    'Systolic',        'mmHg', 90,  120, 120, 139, 140, NULL, 1),
('blood-pressure', 'diastolic',   'Diastolic',       'mmHg', 60,   80,  80,  89,  90, NULL, 2),
('blood-pressure', 'pulse',       'Pulse',           'BPM',  60,  100,  50,  59, NULL,   49, 3),

-- Blood Glucose
('blood-glucose',  'fasting',     'Fasting',         'mg/dL',  70,  99, 100, 125, 126, NULL, 1),
('blood-glucose',  'post_meal',   'Post-meal (2 hr)','mg/dL',  70, 139, 140, 179, 180, NULL, 2),
('blood-glucose',  'random',      'Random',          'mg/dL',  70, 139, 140, 199, 200, NULL, 3),

-- Body Weight & BMI
('body-weight', 'bmi',            'BMI',             NULL,   18.5, 24.9, 25.0, 29.9, 30.0, NULL, 1),
('body-weight', 'body_fat_male',  'Body Fat (Male)', '%',    10.0, 20.0, 20.1, 25.0, 25.1, NULL, 2),
('body-weight', 'body_fat_female','Body Fat (Female)','%',   18.0, 28.0, 28.1, 32.0, 32.1, NULL, 3),

-- Heart Rate
('heart-rate',  'resting_hr',     'Resting HR',      'BPM',  60,  100,  50,   59, NULL,   49, 1);

-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
-- SITE CONFIG
-- â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
INSERT OR IGNORE INTO site_config (config_key, config_value, config_group) VALUES
('hero_headline',           'Your Health. Understood.',                                                                          'hero'),
('hero_subheadline',        'One platform. Every aspect of care.',                                                               'hero'),
('hero_cta_primary',        'Get Started',                                                                                       'hero'),
('hero_cta_secondary',      'View Plans',                                                                                        'hero'),
('doctor_name',             'Dr. Neha Joshi',                                                                                    'doctor_banner'),
('doctor_title',            'Family Health Physician',                                                                           'doctor_banner'),
('doctor_quote',            'Your data is your doctor''s most powerful tool.',                                                   'doctor_banner'),
('doctor_badge',            'MBBS, MD â€” 12 years experience',                                                                   'doctor_banner'),
('brand_name',              'CureBay TotalCare',                                                                                 'brand'),
('brand_phone',             '+91-1800-XXX-XXXX',                                                                                 'brand'),
('brand_email',             'support@curebay.com',                                                                               'brand'),
('brand_address',           'Bhubaneswar, Odisha, India',                                                                        'brand'),
('social_instagram',        'https://instagram.com/curebay',                                                                     'social'),
('social_twitter',          'https://twitter.com/curebay',                                                                       'social'),
('social_linkedin',         'https://linkedin.com/company/curebay',                                                              'social'),
('social_youtube',          'https://youtube.com/@curebay',                                                                      'social'),
('meta_title',              'CureBay TotalCare â€” Smart Health, Complete Care',                                                   'seo'),
('meta_description',        'Connected devices, AI insights, doctor consults, and emergency care â€” all in one subscription.',    'seo'),
('showcase_section_title',  'Find what you need.',                                                                               'product_showcase'),
('showcase_section_subtitle','Smart devices matched to your health concern.',                                                    'product_showcase');
