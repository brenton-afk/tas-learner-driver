import type { SignId } from '../signs';

export type TopicId = 'speed' | 'giveway' | 'signs' | 'learner' | 'sharing' | 'safety' | 'tas';

export interface Topic {
  id: TopicId;
  name: string;
}

export interface Question {
  /** Stable ID. Never change or reuse one: saved progress refers to it. */
  id: string;
  topic: TopicId;
  /** Optional road sign shown above the question. */
  sign?: SignId;
  question: string;
  /** Exactly four options. */
  options: readonly [string, string, string, string];
  /** Index (0–3) of the correct option. */
  answer: 0 | 1 | 2 | 3;
  explanation: string;
}

export const TOPICS: readonly Topic[] = [
  { id: 'speed', name: 'Speed limits' },
  { id: 'giveway', name: 'Giving way & intersections' },
  { id: 'signs', name: 'Signs & road markings' },
  { id: 'learner', name: 'Learner & P-plate rules' },
  { id: 'sharing', name: 'Sharing the road' },
  { id: 'safety', name: 'Alcohol, fatigue & safety' },
  { id: 'tas', name: 'Tasmanian conditions' },
];

export const QUESTIONS: readonly Question[] = [
  // ---------- Speed limits ----------
  {
    id: 'speed-0',
    topic: 'speed',
    question:
      "You hold a Tasmanian learner licence and you're on a road signed 110 km/h. What's your maximum speed?",
    options: ['90 km/h', '100 km/h', '110 km/h', '80 km/h'],
    answer: 0,
    explanation:
      'Learners must never exceed 90 km/h, even where a higher limit is posted. On P1 the cap lifts to 100 km/h.',
  },
  {
    id: 'speed-1',
    topic: 'speed',
    question: 'There are no speed limit signs on a suburban Hobart street. What speed applies?',
    options: ['60 km/h', '50 km/h', '40 km/h', 'Whatever is safe'],
    answer: 1,
    explanation:
      'The default limit in a built-up area is 50 km/h. Outside built-up areas the default is 100 km/h.',
  },
  {
    id: 'speed-2',
    topic: 'speed',
    question:
      "You're passing a stationary police car with red and blue lights flashing on a 60 km/h road. What must you do?",
    options: [
      'Keep to 60 km/h but move over',
      'Slow to 40 km/h as you pass',
      'Stop until an officer waves you through',
      'Slow to 25 km/h',
    ],
    answer: 1,
    explanation:
      'On roads signed 80 km/h or less you must always slow to 40 km/h passing a stopped or slow-moving emergency or roadside assistance vehicle with flashing lights or a siren.',
  },
  {
    id: 'speed-3',
    topic: 'speed',
    question: 'The same rule — but the road is signed 100 km/h. What must you do?',
    options: [
      'Nothing, the rule only applies under 80',
      "Slow to 40 km/h if it's safe; otherwise slow as safely as you can",
      'Stop on the shoulder',
      'Slow to exactly 60 km/h',
    ],
    answer: 1,
    explanation:
      "Above 80 km/h you slow to 40 km/h when it's safe to do so. If braking that hard would be dangerous, slow down as much as you safely can.",
  },
  {
    id: 'speed-4',
    topic: 'speed',
    question:
      'A tow truck is stopped on the shoulder with yellow lights flashing. Does the slow-down rule apply?',
    options: [
      'No, only police and ambulances',
      'Yes — roadside assistance vehicles with yellow flashing lights are included',
      'Only if a person is standing outside it',
      'Only at night',
    ],
    answer: 1,
    explanation:
      'Since August 2022 the rule covers flashing red, blue, magenta and yellow lights — including tow trucks and other roadside assistance vehicles.',
  },
  {
    id: 'speed-5',
    topic: 'speed',
    question:
      "You're travelling the other way on an undivided road and an ambulance is stopped on the opposite shoulder with lights flashing. Do you slow to 40?",
    options: [
      'Yes — the rule applies in both directions',
      'No, only traffic on the same side',
      'Only if you can see people on the road',
      "Only if it's an ambulance",
    ],
    answer: 0,
    explanation:
      "It applies to traffic in both directions, unless there's a dividing median barrier between you and the vehicle.",
  },
  {
    id: 'speed-6',
    topic: 'speed',
    question:
      "You're 40 metres from a stopped bus displaying a School Bus sign with lights flashing. What's your limit?",
    options: ['60 km/h', '50 km/h', '40 km/h', '25 km/h'],
    answer: 2,
    explanation:
      'The limit is 40 km/h within 50 metres of a bus displaying school bus warning signs and lights — approaching from either direction.',
  },
  {
    id: 'speed-7',
    topic: 'speed',
    question: 'What does a speed limit sign actually mean?',
    options: [
      'The speed you should aim to travel',
      'The maximum in ideal conditions — never go faster',
      'The average speed for the trip',
      'The minimum speed allowed',
    ],
    answer: 1,
    explanation:
      "It's a maximum, not a target. In rain, fog, heavy traffic or at night the safe speed is often well below the sign.",
  },
  {
    id: 'speed-8',
    topic: 'speed',
    question: 'An electronic speed sign is blank — no number showing. What limit applies?',
    options: [
      'The last posted limit or the default limit for that road',
      '40 km/h',
      "You can't drive on that road",
      'The limit shown when it was last lit',
    ],
    answer: 0,
    explanation:
      "An electronic limit only applies while it's illuminated. When it's blank, obey the posted or default limit for the road.",
  },
  {
    id: 'speed-9',
    topic: 'speed',
    question: 'Why are learners capped at 90 km/h rather than the posted limit?',
    options: [
      'Because learner cars are usually older',
      'Crash risk rises steeply with speed and inexperience',
      'So police can spot them easily',
      'To save fuel',
    ],
    answer: 1,
    explanation:
      'The graduated licensing system reduces exposure to the highest-risk conditions while experience is still being built.',
  },
  {
    id: 'speed-10',
    topic: 'speed',
    question:
      "You're doing 90 in a 110 zone as a learner and traffic is banking up behind you. What should you do?",
    options: [
      'Speed up to 110 to keep traffic moving',
      'Stay at 90 and pull over safely where you can to let traffic pass',
      'Drive in the right lane so they can pass on the left',
      'Turn on hazard lights and keep going',
    ],
    answer: 1,
    explanation:
      "Your 90 km/h limit doesn't change. Keep left and use a safe pull-over point or slow vehicle turnout to let the queue past.",
  },
  {
    id: 'speed-11',
    topic: 'speed',
    question: 'School zone signs are showing 40. When does that limit apply?',
    options: [
      'Only when children are visible',
      'During the times shown on the sign, on school days',
      'All day, every day',
      'Only on weekdays in term 1',
    ],
    answer: 1,
    explanation:
      'The limit applies for the signed times whether or not you can see any children, and continues until an End School Zone sign.',
  },
  // ---------- Giving way & intersections ----------
  {
    id: 'giveway-12',
    topic: 'giveway',
    question: "You're entering a roundabout. Who do you give way to?",
    options: [
      'Traffic on your right only',
      'Any vehicle already in the roundabout',
      'Traffic on your left',
      'The largest vehicle',
    ],
    answer: 1,
    explanation:
      'Give way to any vehicle already travelling in the roundabout, no matter which direction it came from.',
  },
  {
    id: 'giveway-13',
    topic: 'giveway',
    question: "You're going straight ahead through a roundabout. Which signals do you use?",
    options: [
      'Right on approach, left on exit',
      'No signal on approach, left before you exit',
      'Left on approach only',
      'Hazard lights',
    ],
    answer: 1,
    explanation:
      "No approach signal is needed when going straight, but you must signal left before leaving the roundabout if it's practical.",
  },
  {
    id: 'giveway-14',
    topic: 'giveway',
    question: "You're turning right at a roundabout. What do you do on approach?",
    options: [
      'Signal right and stay in the right lane if there is one',
      'Signal left',
      "Don't signal until you exit",
      'Signal right and stay left',
    ],
    answer: 0,
    explanation:
      'Signal right on approach, keep right through the roundabout, then signal left before exiting.',
  },
  {
    id: 'giveway-15',
    topic: 'giveway',
    question:
      "At a crossroads with no signs, signals or markings, you're going straight ahead. Who do you give way to?",
    options: [
      'Vehicles on your left',
      'Vehicles on your right',
      'Nobody, you have right of way',
      'Whoever arrived first',
    ],
    answer: 1,
    explanation:
      'At an uncontrolled intersection, give way to any vehicle approaching from your right.',
  },
  {
    id: 'giveway-16',
    topic: 'giveway',
    question: "At an uncontrolled intersection you're turning right. Who must you give way to?",
    options: [
      'Only vehicles on your right',
      'Oncoming vehicles going straight or turning left, and vehicles on your right',
      'Nobody',
      'Only pedestrians',
    ],
    answer: 1,
    explanation:
      'Turning right means giving way to oncoming traffic going straight through or turning left, as well as traffic from your right.',
  },
  {
    id: 'giveway-17',
    topic: 'giveway',
    question: "You're driving on the road that ends at a T-intersection. Who gives way?",
    options: [
      'You give way to all traffic on the continuing road',
      'The continuing road gives way to you',
      'Whoever is turning gives way',
      'Give way to the right only',
    ],
    answer: 0,
    explanation:
      'The driver on the terminating (stem) road gives way to all vehicles on the continuing road.',
  },
  {
    id: 'giveway-18',
    topic: 'giveway',
    question:
      'Two cars from opposite directions are both turning right at an intersection. What normally happens?',
    options: [
      'They pass in front of each other',
      'They pass behind each other',
      'The one on the wider road goes first',
      'Both must stop completely',
    ],
    answer: 0,
    explanation:
      'Unless signs or markings say otherwise, drivers turning right from opposite directions pass in front of each other.',
  },
  {
    id: 'giveway-19',
    topic: 'giveway',
    question:
      "You're at a STOP sign with clear visibility both ways and no traffic. What must you do?",
    options: [
      'Slow right down and roll through',
      'Come to a complete stop at the line, then give way',
      'Stop only if a vehicle is coming',
      'Sound your horn and proceed',
    ],
    answer: 1,
    explanation:
      'A STOP sign always requires a complete stop at the line, then giving way before you move off.',
  },
  {
    id: 'giveway-20',
    topic: 'giveway',
    question: "You're making a U-turn. Who must you give way to?",
    options: [
      'Only oncoming traffic',
      'All other vehicles and pedestrians',
      'Traffic on your right only',
      "Nobody once you've signalled",
    ],
    answer: 1,
    explanation:
      'A U-turn requires giving way to everyone, and you must have a clear view of approaching traffic before starting.',
  },
  {
    id: 'giveway-21',
    topic: 'giveway',
    question: "You're moving out of a driveway onto the road. Who gives way?",
    options: [
      'You give way to all road users, including pedestrians on the footpath',
      'Road traffic gives way to you',
      'Nobody, if you sound your horn',
      'Only cyclists give way',
    ],
    answer: 0,
    explanation:
      'Leaving a driveway or property you give way to everything — traffic on the road and anyone on the footpath you cross.',
  },
  {
    id: 'giveway-22',
    topic: 'giveway',
    question:
      "A pedestrian has started crossing the side street you're turning into. What do you do?",
    options: [
      'Turn quickly in front of them',
      "Give way and wait until they've finished crossing",
      'Sound your horn',
      'Turn behind them at speed',
    ],
    answer: 1,
    explanation:
      "When turning at an intersection you must give way to pedestrians crossing the road you're turning into.",
  },
  {
    id: 'giveway-23',
    topic: 'giveway',
    question: 'Traffic lights turn amber as you approach. What must you do?',
    options: [
      'Speed up to clear the intersection',
      "Stop, unless you're so close that stopping safely isn't possible",
      'Keep the same speed and continue',
      'Stop only if a camera is fitted',
    ],
    answer: 1,
    explanation:
      "Amber means stop. You only continue if you're too close to pull up safely — not because it's more convenient.",
  },
  {
    id: 'giveway-24',
    topic: 'giveway',
    question: 'Your lane ends ahead and lane lines guide you into the next lane. Who gives way?',
    options: [
      "You give way to traffic already in the lane you're moving into",
      'Traffic in that lane gives way to you',
      'Whoever is faster',
      'Both stop and take turns',
    ],
    answer: 0,
    explanation:
      "When a lane ends and you must cross a line to merge, you give way to vehicles in the lane you're entering.",
  },
  {
    id: 'giveway-25',
    topic: 'giveway',
    question: 'Two lanes merge into one with no lane lines. Who gives way?',
    options: [
      'The driver on the left',
      'The driver whose vehicle is behind gives way to the vehicle in front',
      'The faster vehicle',
      'Neither — both must stop',
    ],
    answer: 1,
    explanation:
      'In a zip merge with no marked lines, if the other car is ahead of you, you give way.',
  },
  // ---------- Signs & road markings ----------
  {
    id: 'signs-26',
    topic: 'signs',
    sign: 'stop',
    question: 'What must you do at this sign?',
    options: [
      'Slow down and give way',
      'Stop completely at the line, then give way',
      'Stop only if traffic is approaching',
      'Sound your horn and proceed',
    ],
    answer: 1,
    explanation: 'A full stop is required every time, even on an empty road.',
  },
  {
    id: 'signs-27',
    topic: 'signs',
    sign: 'giveway',
    question: 'What does this sign require?',
    options: [
      'Stop completely every time',
      'Slow or stop as needed and give way to traffic and pedestrians',
      'Give way only to trucks',
      'Merge left',
    ],
    answer: 1,
    explanation:
      "You don't have to stop if the way is clear, but you must be able to stop and must give way.",
  },
  {
    id: 'signs-28',
    topic: 'signs',
    sign: 'roundabout',
    question: 'What is this yellow diamond sign telling you?',
    options: [
      'A roundabout is ahead — prepare to give way',
      'You are in a roundabout',
      'No entry ahead',
      'Traffic circles are banned',
    ],
    answer: 0,
    explanation:
      "Yellow diamond signs are warnings about what's ahead. Slow down and be ready to give way to traffic already in the roundabout.",
  },
  {
    id: 'signs-29',
    topic: 'signs',
    sign: 'animal',
    question: 'What does this sign warn of?',
    options: [
      'A wildlife park entrance',
      'Animals may be on the road ahead',
      'Livestock transport route',
      'No pets in vehicles',
    ],
    answer: 1,
    explanation:
      "Common on Tasmanian roads, especially at dawn and dusk. Slow down and scan the verges — don't swerve suddenly.",
  },
  {
    id: 'signs-30',
    topic: 'signs',
    sign: 'slippery',
    question: 'What does this sign mean?',
    options: [
      'Road may be slippery — reduce speed',
      'Car wash ahead',
      'Loose gravel',
      'Steep descent',
    ],
    answer: 0,
    explanation:
      'Slow down before the hazard, avoid harsh braking or steering, and increase your following distance.',
  },
  {
    id: 'signs-31',
    topic: 'signs',
    sign: 'nouturn',
    question: 'What does this sign prohibit?',
    options: ['Turning right', 'Making a U-turn', 'Overtaking', 'Reversing'],
    answer: 1,
    explanation:
      'No U-turn. You must also never do a U-turn at traffic lights unless a U-turn permitted sign is displayed.',
  },
  {
    id: 'signs-32',
    topic: 'signs',
    sign: 'noentry',
    question: 'What does this sign mean?',
    options: [
      'No entry — do not drive past this sign',
      'No stopping',
      'No trucks',
      'Road closed to pedestrians',
    ],
    answer: 0,
    explanation: 'No entry at all in this direction, typically at the exit of a one-way street.',
  },
  {
    id: 'signs-33',
    topic: 'signs',
    sign: 'school',
    question: "You see this sign during the signed times. What's your limit?",
    options: ['50 km/h', '40 km/h', '60 km/h', 'Whatever the previous sign said'],
    answer: 1,
    explanation:
      '40 km/h through the school zone for the signed times, and it stays 40 until an End School Zone sign.',
  },
  {
    id: 'signs-34',
    topic: 'signs',
    sign: 'railway',
    question: 'What does this sign mark?',
    options: ['A railway level crossing', 'A bridge', 'A crossroad', 'A pedestrian crossing'],
    answer: 0,
    explanation:
      'Slow down, look and listen both ways, and never queue onto the tracks — only cross if the far side is clear.',
  },
  {
    id: 'signs-35',
    topic: 'signs',
    sign: 'pedestrian',
    question: 'What is this sign warning you about?',
    options: ['A pedestrian crossing ahead', 'A school ahead', 'A bus stop', 'A footpath ends'],
    answer: 0,
    explanation:
      'Be ready to stop. You must not overtake a vehicle that has stopped at a pedestrian crossing.',
  },
  {
    id: 'signs-36',
    topic: 'signs',
    question: 'What does a single continuous (unbroken) centre line mean?',
    options: [
      'You may cross it to overtake',
      'You must not cross it except to enter or leave the road',
      'It marks the edge of the road',
      'It marks a bus lane',
    ],
    answer: 1,
    explanation:
      "Don't cross an unbroken line to overtake. You may cross only to turn into or out of a property or road.",
  },
  {
    id: 'signs-37',
    topic: 'signs',
    question:
      'A broken line runs beside a continuous line, with the broken line on your side. What can you do?',
    options: [
      'You must not cross it',
      'You may cross to overtake when it is safe',
      'Only motorbikes may cross',
      'You must stop before it',
    ],
    answer: 1,
    explanation:
      "When the broken line is nearest you, you may cross to overtake if it's safe and clear.",
  },
  // ---------- Learner & P-plate rules ----------
  {
    id: 'learner-38',
    topic: 'learner',
    question: 'What is the maximum blood alcohol content for a Tasmanian learner driver?',
    options: ['0.05', '0.02', '0.00', '0.08'],
    answer: 2,
    explanation:
      'Zero. Learners and provisional drivers must have no alcohol in their system at all.',
  },
  {
    id: 'learner-39',
    topic: 'learner',
    question: 'Can a learner use a mobile phone on hands-free or speaker while driving?',
    options: [
      "Yes, if it's in a cradle",
      'Yes, on speaker only',
      'No — the ban is total for learners',
      'Only for navigation',
    ],
    answer: 2,
    explanation:
      'The ban covers all use during the learner and P1 stages: no holding, no hands-free, no speaker, no navigation.',
  },
  {
    id: 'learner-40',
    topic: 'learner',
    question: 'Who can supervise a Tasmanian learner driver?',
    options: [
      'Anyone over 21',
      'Someone with a full Australian car licence held continuously for the last 12 months',
      'Any P2 driver',
      'A parent with any licence',
    ],
    answer: 1,
    explanation:
      'They need a full Australian car licence (not a restricted one), held continuously for the previous 12 months, and they must actually be instructing you.',
  },
  {
    id: 'learner-41',
    topic: 'learner',
    question: 'How many supervised hours must a novice learner log before the P1 assessment?',
    options: [
      '50 hours',
      '80 hours, including 15 at night',
      '120 hours, including 20 at night',
      '60 hours',
    ],
    answer: 1,
    explanation:
      '80 hours total with at least 15 at night, verified and signed by your supervisory driver.',
  },
  {
    id: 'learner-42',
    topic: 'learner',
    question:
      'How long must a novice learner hold the learner licence before sitting the P1 assessment?',
    options: ['3 months', '6 months', '9 months', '12 continuous months'],
    answer: 3,
    explanation:
      'A minimum of 12 continuous months, and you must be at least 17 to hold a P1 licence.',
  },
  {
    id: 'learner-43',
    topic: 'learner',
    question: 'Can a learner tow a trailer or another vehicle?',
    options: [
      'Yes, with a supervisor',
      'Yes, if under 750 kg',
      'No — learners must not tow',
      'Only on private roads',
    ],
    answer: 2,
    explanation:
      'No towing on a learner licence. P1 drivers may tow a trailer if the P plates stay visible.',
  },
  {
    id: 'learner-44',
    topic: 'learner',
    question: 'From what age can you take the driver knowledge test in Tasmania?',
    options: ['15 years and 11 months', '16 years', '16 years and 6 months', '17 years'],
    answer: 0,
    explanation:
      "You can sit it from 15 years and 11 months, but the learner licence isn't issued until you turn 16.",
  },
  {
    id: 'learner-45',
    topic: 'learner',
    question: 'One hour with a certified driving instructor gives you how many logbook hours?',
    options: ['One hour', 'Two hours, capped at 20', 'Three hours, uncapped', 'No credit'],
    answer: 1,
    explanation:
      'Each lesson hour counts as two, up to a 20-hour cap. The Rotary RYDA program adds five hours for eligible learners.',
  },
  {
    id: 'learner-46',
    topic: 'learner',
    question: 'Where must L plates be displayed?',
    options: [
      'Rear window only',
      'Front and rear, clearly visible',
      'On the dashboard',
      'Only when a supervisor is present',
    ],
    answer: 1,
    explanation: "Clearly visible from both the front and rear of the car whenever you're driving.",
  },
  {
    id: 'learner-47',
    topic: 'learner',
    question: 'What is the P1 speed limit in Tasmania?',
    options: ['90 km/h', '100 km/h', 'The posted limit', '80 km/h'],
    answer: 1,
    explanation: 'P1 drivers are capped at 100 km/h. P2 drivers may travel at the posted limit.',
  },
  {
    id: 'learner-48',
    topic: 'learner',
    question:
      'A P1 driver under 25 is in their first year. How many peer passengers aged 16–21 can they carry?',
    options: ['None at all', 'One', 'Two', 'As many as there are seatbelts'],
    answer: 1,
    explanation:
      'Only one peer passenger aged 16 to 21, unless an exemption applies. Immediate family members are treated differently — check the peer passenger fact sheet.',
  },
  {
    id: 'learner-49',
    topic: 'learner',
    question: 'What colour P plates does a P1 driver display in Tasmania?',
    options: ['Green on white', 'Red on white', 'Yellow on black', 'Blue on white'],
    answer: 1,
    explanation: 'P1 is red on white; P2 is green on white.',
  },
  {
    id: 'learner-50',
    topic: 'learner',
    question: 'You take your P1 driving assessment in an automatic car. What licence do you get?',
    options: [
      'A licence for automatic cars only',
      'A licence for both manual and automatic',
      'A manual licence after 6 months',
      'No restriction applies',
    ],
    answer: 0,
    explanation:
      "Test in an automatic and you're limited to automatics. Test in a manual and you can drive both.",
  },
  {
    id: 'learner-51',
    topic: 'learner',
    question: 'What must a learner always carry while driving?',
    options: ['Their logbook', 'Their licence', 'Proof of insurance', 'A first aid kit'],
    answer: 1,
    explanation: 'You must carry your licence on you whenever you drive.',
  },
  // ---------- Sharing the road ----------
  {
    id: 'sharing-52',
    topic: 'sharing',
    question: "You're overtaking a cyclist in a 50 km/h zone. What's the minimum gap?",
    options: ['1 metre', '1.5 metres', '2 metres', 'Half a car width'],
    answer: 0,
    explanation: "At 60 km/h or less you need at least 1 metre. Above 60 km/h it's 1.5 metres.",
  },
  {
    id: 'sharing-53',
    topic: 'sharing',
    question: "Same cyclist, but the road is signed 80 km/h. What's the minimum gap?",
    options: ['1 metre', '1.5 metres', '1.2 metres', 'No minimum applies'],
    answer: 1,
    explanation:
      "1.5 metres in zones above 60 km/h. You may cross a centre line to give the space if it's safe and clear.",
  },
  {
    id: 'sharing-54',
    topic: 'sharing',
    question: 'Two cyclists are riding side by side in a single lane. Is that legal?',
    options: [
      'No, never',
      'Yes — riding two abreast is allowed',
      'Only in bike lanes',
      'Only on Sundays',
    ],
    answer: 1,
    explanation:
      "Cyclists may ride two abreast, up to 1.5 metres apart. Pass them as you would a car — only when it's safe.",
  },
  {
    id: 'sharing-55',
    topic: 'sharing',
    question:
      'A bus is indicating to pull out from a bus stop in a 60 km/h zone. What should you do?',
    options: ['Speed up to pass', 'Give way to the bus', 'Sound your horn', 'Overtake on the left'],
    answer: 1,
    explanation:
      'In zones of 70 km/h or less you must give way to a bus signalling to move out from a stop.',
  },
  {
    id: 'sharing-56',
    topic: 'sharing',
    question: 'A car ahead has stopped at a pedestrian crossing. Can you overtake it?',
    options: [
      'Yes, if you go slowly',
      'No — never overtake a vehicle stopped at a crossing',
      'Only if the crossing is clear on your side',
      "Yes, if it's a small car",
    ],
    answer: 1,
    explanation:
      "You can't see what the stopped car can see. Overtaking there is how pedestrians get hit.",
  },
  {
    id: 'sharing-57',
    topic: 'sharing',
    question: 'What is the minimum safe following distance in good conditions?',
    options: ['One second', 'Two seconds', 'Half a car length', 'Three car lengths at any speed'],
    answer: 1,
    explanation:
      'Two seconds minimum in good conditions — double it or more in rain, fog, gravel or at night.',
  },
  {
    id: 'sharing-58',
    topic: 'sharing',
    question:
      'A large truck is turning left ahead of you and swings out to the right first. What should you do?',
    options: [
      "Overtake on the left while there's space",
      'Stay well back — trucks need extra room to turn',
      'Move up beside the cab',
      'Sound your horn',
    ],
    answer: 1,
    explanation:
      "Never move into the gap a turning truck leaves. Stay behind and out of the driver's blind spots.",
  },
  {
    id: 'sharing-59',
    topic: 'sharing',
    question: 'When must you use your headlights?',
    options: [
      'Only between midnight and 5am',
      "Between sunset and sunrise, and any time you can't see clearly 100 metres ahead",
      'Only in rain',
      'Only outside towns',
    ],
    answer: 1,
    explanation:
      'Sunset to sunrise, plus fog, heavy rain, smoke or dusk — any time visibility drops.',
  },
  {
    id: 'sharing-60',
    topic: 'sharing',
    question: 'A car is coming towards you at night with high beam on. What should you do?',
    options: [
      'Flash your high beam back',
      'Look to the left edge of your lane and slow down',
      'Stare at their headlights to track them',
      'Close one eye',
    ],
    answer: 1,
    explanation:
      'Looking left of the glare keeps you oriented while your eyes recover. Dip your own lights and reduce speed.',
  },
  {
    id: 'sharing-61',
    topic: 'sharing',
    question: 'Who is responsible for making sure passengers under 16 are properly restrained?',
    options: ['Each passenger', 'The driver', 'The front seat passenger', 'The vehicle owner'],
    answer: 1,
    explanation:
      'The driver is legally responsible for restraints for anyone under 16 in the vehicle.',
  },
  // ---------- Alcohol, fatigue & safety ----------
  {
    id: 'safety-62',
    topic: 'safety',
    question: 'What actually reduces blood alcohol content?',
    options: ['Coffee', 'A cold shower', 'Time', 'Food'],
    answer: 2,
    explanation:
      'Only time. The body clears roughly one standard drink per hour and nothing speeds that up.',
  },
  {
    id: 'safety-63',
    topic: 'safety',
    question:
      'You had a big night and stopped drinking at 2am. At 8am you feel fine. Can you drive on your learner licence?',
    options: [
      'Yes, if you feel alert',
      "Only if you've eaten",
      'Not unless your BAC is genuinely 0.00 — alcohol can still be present hours later',
      'Yes, after coffee',
    ],
    answer: 2,
    explanation:
      'BAC can remain above zero well into the next morning, and learners must be at exactly 0.00. Fatigue after drinking also lingers.',
  },
  {
    id: 'safety-64',
    topic: 'safety',
    question: "What's the general BAC limit for a fully licensed Tasmanian driver?",
    options: ['0.00', '0.02', '0.05', '0.08'],
    answer: 2,
    explanation: 'Under 0.05 for full licence holders. Learner, P1 and P2 drivers must be 0.00.',
  },
  {
    id: 'safety-65',
    topic: 'safety',
    question: 'Which of these is a genuine warning sign of driver fatigue?',
    options: [
      'Drifting in the lane, yawning, missing signs',
      'Feeling hungry',
      'Wanting music',
      'Checking mirrors often',
    ],
    answer: 0,
    explanation:
      'Lane drift, heavy eyes, yawning and not remembering the last few kilometres all mean stop and rest.',
  },
  {
    id: 'safety-66',
    topic: 'safety',
    question: 'You feel drowsy on a long drive. What actually works?',
    options: [
      'Wind down the window and turn up the radio',
      'Pull over somewhere safe and take a 15–20 minute nap',
      'Drink an energy drink and push on',
      'Drive faster to arrive sooner',
    ],
    answer: 1,
    explanation:
      "Fresh air and loud music don't work. Only sleep restores alertness — swap drivers or stop.",
  },
  {
    id: 'safety-67',
    topic: 'safety',
    question:
      'Some prescription and over-the-counter medicines carry a warning label about driving. What should you do?',
    options: [
      'Ignore it if you feel fine',
      'Halve the dose',
      'Check with your pharmacist or doctor before driving',
      'Only avoid driving at night',
    ],
    answer: 2,
    explanation:
      'Antihistamines, strong painkillers and some cold medicines impair reaction time. Ask before you drive.',
  },
  {
    id: 'safety-68',
    topic: 'safety',
    question: "Your car starts to skid on a wet corner. What's the first thing to do?",
    options: [
      'Brake hard',
      'Ease off the accelerator and look and steer where you want to go',
      'Pull the handbrake',
      'Steer sharply the other way',
    ],
    answer: 1,
    explanation:
      'Smooth inputs recover grip. Harsh braking or sudden steering usually makes a skid worse.',
  },
  {
    id: 'safety-69',
    topic: 'safety',
    question:
      "You're in a minor crash with no injuries and the other driver is present. What must you do?",
    options: [
      'Drive off if the damage is small',
      'Stop and exchange names, addresses and vehicle details',
      'Only call insurance',
      'Wait for police before speaking',
    ],
    answer: 1,
    explanation:
      "You must stop and exchange details. Report to police if anyone is injured, or if you can't find the owner of damaged property.",
  },
  {
    id: 'safety-70',
    topic: 'safety',
    question: "Your car breaks down on a busy road. What's the safest action?",
    options: [
      "Stay in the driver's seat with lights off",
      'Get the car as far left as possible, hazard lights on, and move to a safe spot away from traffic',
      'Stand behind the car to warn traffic',
      'Push the car across the road',
    ],
    answer: 1,
    explanation:
      "Get clear of the traffic lane and don't stand where a vehicle could hit you — behind a barrier or well off the road.",
  },
  {
    id: 'safety-71',
    topic: 'safety',
    question: 'Before every drive, what should you check?',
    options: [
      "Nothing, that's the mechanic's job",
      'Mirrors, seat position, seatbelt, and that lights and tyres look right',
      'Only fuel',
      'Only the radio station',
    ],
    answer: 1,
    explanation:
      'Seat, mirrors and belt first, then a quick walk-around habit for tyres and lights. Set up navigation before you move off.',
  },
  // ---------- Tasmanian conditions ----------
  {
    id: 'tas-72',
    topic: 'tas',
    question: "A wallaby jumps onto the road in front of you at dusk. What's the safest response?",
    options: [
      'Swerve hard to miss it',
      "Brake in a straight line and stay in your lane if you can't stop in time",
      'Accelerate past it',
      'Close your eyes and hope',
    ],
    answer: 1,
    explanation:
      'Swerving at speed causes head-on and rollover crashes. Brake firmly, hold your lane, and slow down in wildlife areas at dawn and dusk.',
  },
  {
    id: 'tas-73',
    topic: 'tas',
    question: 'When is wildlife most active on Tasmanian roads?',
    options: ['Midday', 'Dawn and dusk, and overnight', 'Mid-afternoon', 'Only in summer'],
    answer: 1,
    explanation:
      'Peak activity is around dawn, dusk and at night — exactly when your visibility is worst.',
  },
  {
    id: 'tas-74',
    topic: 'tas',
    question:
      "You're driving over the Midland Highway on a frosty winter morning. Where is black ice most likely?",
    options: [
      'On sunny straights',
      'On shaded corners, bridges and overpasses',
      'Only in car parks',
      'On gravel roads only',
    ],
    answer: 1,
    explanation:
      'Shaded sections and bridges freeze first and stay frozen longest. Slow down before the corner, not in it.',
  },
  {
    id: 'tas-75',
    topic: 'tas',
    question: "You're on a narrow gravel road in the Tasmanian midlands. How should you drive?",
    options: [
      'Same speed as sealed roads',
      'Slower, smoother, with a much bigger following distance',
      'In the middle at all times',
      'With cruise control on',
    ],
    answer: 1,
    explanation:
      'Grip is far lower and stopping distances much longer. Loose gravel plus sudden inputs equals loss of control.',
  },
  {
    id: 'tas-76',
    topic: 'tas',
    question: 'You meet a logging truck on a narrow rural road. What should you do?',
    options: [
      'Hold your position and expect it to move',
      'Slow down, keep well left, and give it room',
      'Flash your lights and continue',
      'Stop in the middle of the road',
    ],
    answer: 1,
    explanation:
      'Heavy vehicles need more of the road and much longer to stop. Slow, keep left, and wait if the road is too narrow.',
  },
  {
    id: 'tas-77',
    topic: 'tas',
    question: "It's raining after a long dry spell. Why are the first minutes most dangerous?",
    options: [
      'Tyres get colder',
      'Water lifts oil and dust off the surface, making it very slippery',
      'Windscreen wipers wear out',
      'Speed limits change automatically',
    ],
    answer: 1,
    explanation:
      'The oily film on the surface makes grip unpredictable. Increase your following distance and reduce speed early.',
  },
  {
    id: 'tas-78',
    topic: 'tas',
    question: "You're driving into low winter sun on the way home from Hobart. What helps most?",
    options: [
      'High beam',
      'Sun visor, clean windscreen, slower speed and more following distance',
      'Sunglasses only',
      'Following closely behind another car',
    ],
    answer: 1,
    explanation:
      "A dirty windscreen scatters low sun into glare you can't see through. Clean glass and extra space buy you time.",
  },
  {
    id: 'tas-79',
    topic: 'tas',
    question: 'You come across fog on the Southern Outlet. What should you use?',
    options: [
      'High beam headlights',
      'Low beam headlights and reduced speed',
      'Hazard lights while moving normally',
      'Parking lights only',
    ],
    answer: 1,
    explanation:
      'High beam reflects off fog and makes visibility worse. Low beam plus fog lights if fitted, and slow right down.',
  },
];
