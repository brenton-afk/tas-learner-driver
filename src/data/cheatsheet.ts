/**
 * Cheat sheet content. Wrap text in **double asterisks** to highlight a number.
 * Line breaks inside an item are kept as written in the original page.
 */
export interface CheatSection {
  title: string;
  items: readonly string[];
}

export const CHEAT_INTRO = 'The numbers that come up most. Learn these and the rest is judgement.';

export const CHEAT_SECTIONS: readonly CheatSection[] = [
  {
    title: 'Your limits as a learner',
    items: [
      'Maximum **90 km/h** — always, even in a 110 zone',
      'Blood alcohol **0.00**',
      'Mobile phone: **no use at all** — not hands-free, not speaker, not navigation',
      'L plates visible front and rear; carry your licence; no towing',
      'Supervisory driver: full Australian car licence held continuously for the last 12 months, sitting beside you',
    ],
  },
  {
    title: 'Getting to your P1',
    items: [
      'Knowledge test from **15 years 11 months**; learner licence issued at **16**',
      '**80** logbook hours, including **15** at night',
      'Hold the learner licence **12 continuous months**; be at least **17**',
      '1 hour with a certified instructor = **2** logbook hours (capped at 20). RYDA program = **5** hours',
      "Pass the P1 driving assessment. Test in an automatic and you're limited to automatics",
    ],
  },
  {
    title: 'After your Ps',
    items: [
      'P1: red on white plates, **100 km/h** cap, 0.00 BAC, no phone use, peer passenger limits under 25, held 12 months',
      'P2: green on white plates, posted speed limit, 0.00 BAC, held 1–2 years depending on your age',
      'Full licence: under **0.05** BAC',
    ],
  },
  {
    title: 'Speed numbers',
    items: [
      'Default built-up area: **50 km/h**. Default outside built-up areas: **100 km/h**',
      'School zone: **40 km/h** during signed times',
      'Within **50 m** of a school bus with warning lights: **40 km/h**, both directions',
      'Passing a stopped or slow-moving emergency or roadside assistance vehicle with flashing red, blue, magenta or yellow lights, or a siren:\n**40 km/h** on roads up to 80 km/h. Above 80 km/h, slow to 40 if safe, otherwise slow as much as you safely can.\nApplies both directions unless a median barrier separates you.',
    ],
  },
  {
    title: 'Giving way',
    items: [
      'Roundabout: give way to anything already in it. Signal right on approach if turning right; signal left before exiting',
      'Uncontrolled crossroads, going straight: give way to the right',
      'Turning right: give way to oncoming traffic going straight or turning left',
      'T-intersection: the road that ends gives way to the road that continues',
      'U-turn: give way to everyone, and only where you have a clear view',
      'Leaving a driveway: give way to everything, including people on the footpath',
      "Turning at an intersection: give way to pedestrians crossing the road you're entering",
      'Lane ends and you cross a line to merge: give way to that lane. Zip merge with no lines: the car in front has right of way',
    ],
  },
  {
    title: 'Space and vision',
    items: [
      'Following distance: **2 seconds** minimum, more in rain, gravel, fog or at night',
      'Passing a cyclist: **1 m** in zones up to 60 km/h, **1.5 m** above 60',
      "Headlights: sunset to sunrise, and whenever you can't see clearly 100 m ahead",
      'Never overtake a vehicle stopped at a pedestrian crossing',
      'Give way to a bus signalling to leave a stop in zones of 70 km/h or less',
    ],
  },
  {
    title: 'Tasmanian conditions',
    items: [
      "Wildlife peaks at dawn, dusk and overnight — brake straight, don't swerve",
      'Black ice sits on shaded corners, bridges and overpasses; slow before the corner',
      'First rain after a dry spell is the most slippery',
      'Gravel roads: slower, smoother, much bigger gaps',
      'Fog: low beam, not high beam',
    ],
  },
  {
    title: 'If something goes wrong',
    items: [
      "Crash: stop, exchange names, addresses and vehicle details. Report to police if anyone is injured or you can't find the property owner",
      'Breakdown: get as far left as possible, hazard lights on, and move yourself away from traffic',
      'Skid: ease off, look and steer where you want to go, no harsh braking',
      'Only **time** lowers blood alcohol. Only **sleep** fixes fatigue',
    ],
  },
];

export const CHEAT_FOOTNOTE =
  'Checked against platesplus.tas.gov.au and transport.tas.gov.au in August 2026. Rules change — confirm anything important on those sites before your test.';
