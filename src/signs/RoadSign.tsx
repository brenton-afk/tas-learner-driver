import { SIGNS, type SignId } from './registry';

export function RoadSign({ id, className }: { id: SignId; className?: string }) {
  const { Component, description } = SIGNS[id];
  return <Component label={`Road sign: ${description}`} className={className} />;
}
