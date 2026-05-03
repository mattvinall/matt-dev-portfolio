type Contribution = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type ApiResponse = {
  total: Record<string, number>;
  contributions: Contribution[];
};

async function fetchContributions(username: string): Promise<ApiResponse | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    return (await res.json()) as ApiResponse;
  } catch {
    return null;
  }
}

function groupByWeek(contributions: Contribution[]): Contribution[][] {
  const weeks: Contribution[][] = [];
  let currentWeek: Contribution[] = [];
  contributions.forEach((c) => {
    const day = new Date(c.date).getUTCDay();
    if (day === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(c);
  });
  if (currentWeek.length > 0) weeks.push(currentWeek);
  return weeks;
}

const LEVEL_OPACITY = ["0.06", "0.25", "0.5", "0.75", "1"];

export async function GitHubContributions({ username }: { username: string }) {
  const data = await fetchContributions(username);
  if (!data) return null;

  const weeks = groupByWeek(data.contributions);
  const totalLastYear = Object.values(data.total).reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Recently shipping
          </div>
          <div className="mt-2 font-serif text-2xl text-text">
            <span className="text-accent">{totalLastYear.toLocaleString()}</span>{" "}
            <span className="text-text-muted">contributions in the last year</span>
          </div>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="hidden font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-accent md:block"
        >
          @{username} →
        </a>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week.find(
                  (d) => new Date(d.date).getUTCDay() === di
                );
                if (!day) {
                  return (
                    <div
                      key={di}
                      className="h-[11px] w-[11px] rounded-[2px]"
                      style={{ background: "transparent" }}
                    />
                  );
                }
                return (
                  <div
                    key={di}
                    title={`${day.count} contributions on ${day.date}`}
                    className="h-[11px] w-[11px] rounded-[2px]"
                    style={{
                      background:
                        day.level === 0
                          ? "color-mix(in srgb, var(--text) 8%, transparent)"
                          : `color-mix(in srgb, var(--accent) ${
                              Number(LEVEL_OPACITY[day.level]) * 100
                            }%, transparent)`,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-text-muted">
        <span className="font-mono">Less</span>
        <div className="flex gap-[3px]">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="h-[11px] w-[11px] rounded-[2px]"
              style={{
                background:
                  level === 0
                    ? "color-mix(in srgb, var(--text) 8%, transparent)"
                    : `color-mix(in srgb, var(--accent) ${
                        Number(LEVEL_OPACITY[level]) * 100
                      }%, transparent)`,
              }}
            />
          ))}
        </div>
        <span className="font-mono">More</span>
      </div>
    </div>
  );
}
