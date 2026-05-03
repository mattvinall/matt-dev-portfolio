import { GitHubContributions } from "@/components/github-contributions";
import { ActivityHeader } from "@/components/sections/activity-header";

export function Activity() {
  return (
    <section id="activity" className="mx-auto max-w-6xl px-6 py-16">
      <ActivityHeader />
      <div className="mt-8">
        <GitHubContributions username="mattvinall" />
      </div>
    </section>
  );
}
