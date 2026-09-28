import { siGithub, type SimpleIcon } from "simple-icons";

// Brand logos, only for social links (CLAUDE.md §3). A brand missing here
// (LinkedIn is not in simple-icons) is shown as text.
const brandIcons: Record<string, SimpleIcon> = { github: siGithub };

export function getBrandIcon(id: string): SimpleIcon | undefined {
  return brandIcons[id];
}
