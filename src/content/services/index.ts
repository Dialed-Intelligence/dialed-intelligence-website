import type { Service } from "./types";
import { operationsAutomation } from "./operations-automation";
import { dataSystems } from "./data-systems";
import { businessIntelligence } from "./business-intelligence";
import { customerService } from "./customer-service";
import { quoting } from "./quoting";
import { inventory } from "./inventory";
import { pricing } from "./pricing";

export type { Service, ServiceBeat, ServicePhase } from "./types";
export { serviceLabels, serviceOg } from "./labels";

/**
 * Canonical ordering. The two foundations first, then the systems that build
 * on them, then the two that need the most history.
 */
export const services: Service[] = [
  operationsAutomation,
  dataSystems,
  businessIntelligence,
  customerService,
  quoting,
  inventory,
  pricing,
];

export const serviceNav = services.map((s) => ({
  slug: s.slug,
  title: s.title,
  href: `/services/${s.slug}`,
}));

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
