import * as S from './svgs';

interface SignDef {
  Component: (props: { label: string; className?: string }) => React.JSX.Element;
  /** What a sighted person sees, without naming the sign's meaning. */
  description: string;
}

export const SIGNS = {
  stop: { Component: S.StopSign, description: 'Red eight-sided sign with the word STOP' },
  giveway: {
    Component: S.GivewaySign,
    description: 'Upside-down triangle with a red border and the words GIVE WAY',
  },
  roundabout: {
    Component: S.RoundaboutSign,
    description: 'Yellow diamond sign showing a ring with three roads joining it',
  },
  crossroads: { Component: S.CrossroadsSign, description: 'Yellow diamond sign showing a cross' },
  tjunction: { Component: S.TjunctionSign, description: 'Yellow diamond sign showing a T shape' },
  slippery: {
    Component: S.SlipperySign,
    description: 'Yellow diamond sign showing a car with wavy lines behind it',
  },
  animal: { Component: S.AnimalSign, description: 'Yellow diamond sign showing a kangaroo' },
  speed60: {
    Component: S.Speed60Sign,
    description: 'Round white sign with a red border and the number 60',
  },
  school: {
    Component: S.SchoolSign,
    description: 'Yellow sign with a red-bordered circle showing 40 and the words SCHOOL ZONE',
  },
  noentry: { Component: S.NoentrySign, description: 'Red circle with a white horizontal bar' },
  nouturn: {
    Component: S.NouturnSign,
    description: 'Round sign showing a U-shaped arrow with a red line through it',
  },
  pedestrian: {
    Component: S.PedestrianSign,
    description: 'Yellow diamond sign showing a person walking',
  },
  railway: {
    Component: S.RailwaySign,
    description: 'Two white boards crossed in an X shape on a post',
  },
} satisfies Record<string, SignDef>;

export type SignId = keyof typeof SIGNS;

export function isSignId(id: string): id is SignId {
  return Object.prototype.hasOwnProperty.call(SIGNS, id);
}

export function RoadSign({ id, className }: { id: SignId; className?: string }) {
  const { Component, description } = SIGNS[id];
  return <Component label={`Road sign: ${description}`} className={className} />;
}
