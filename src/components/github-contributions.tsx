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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { cache: "no-store", signal: controller.signal }
    );
    clearTimeout(timeout);
    if (!res.ok) return null;
    return (await res.json()) as ApiResponse;
  } catch {
    return null;
  }
}

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const LEVEL_OPACITY = ["0.06", "0.25", "0.5", "0.75", "1"];

type WeekColumn = {
  weekIndex: number;
  days: (Contribution | null)[];
  monthLabel: string | null;
};

function buildWeekColumns(contributions: Contribution[]): WeekColumn[] {
  if (contributions.length === 0) return [];

  // Pad the start so the first column begins on Sunday (day 0)
  const firstDay = new Date(contributions[0].date);
  const startPad = firstDay.getUTCDay();

  const padded: (Contribution | null)[] = [
    ...Array.from({ length: startPad }, () => null),
    ...contributions,
  ];

  const weeks: WeekColumn[] = [];
  for (let i = 0; i < padded.length; i += 7) {
    const days = padded.slice(i, i + 7);
    while (days.length < 7) days.push(null);

    // Show month label on the first column of each calendar month
    let monthLabel: string | null = null;
    const firstReal = days.find((d) => d !== null);
    if (firstReal) {
      const date = new Date(firstReal.date);
      const day = date.getUTCDate();
      // Show label if this week contains the 1st through 7th of the month
      if (day <= 7) {
        monthLabel = MONTH_NAMES[date.getUTCMonth()];
      }
    }

    weeks.push({ weekIndex: weeks.length, days, monthLabel });
  }

  return weeks;
}

function levelToBackground(level: 0 | 1 | 2 | 3 | 4): string {
  if (level === 0) return "color-mix(in srgb, var(--text) 8%, transparent)";
  return `color-mix(in srgb, var(--accent) ${
    Number(LEVEL_OPACITY[level]) * 100
  }%, transparent)`;
}

export async function GitHubContributions({ username }: { username: string }) {
  const data = await fetchContributions(username);

  if (!data) {
    return (
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="font-mono text-xs uppercase tracking-widest text-text-muted">
          GitHub
        </div>
        <p className="mt-3 text-text-muted">
          View the full contribution graph at{" "}
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            github.com/{username}
          </a>
          .
        </p>
      </div>
    );
  }

  const weeks = buildWeekColumns(data.contributions);
  const totalLastYear = Object.values(data.total).reduce((a, b) => a + b, 0);

  const cellSize = 12;
  const cellGap = 3;
  const dayLabelWidth = 32;

  return (
    <div className="rounded-lg border border-border bg-surface p-6">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4">
        <div className="font-serif text-2xl text-text">
          <span className="text-accent">{totalLastYear.toLocaleString()}</span>{" "}
          <span className="text-text-muted">contributions in the last year</span>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
        >
          @{username} →
        </a>
      </div>

      <div className="overflow-x-auto pb-1">
        <div style={{ minWidth: dayLabelWidth + weeks.length * (cellSize + cellGap) }}>
          {/* Month labels */}
          <div
            className="flex"
            style={{
              paddingLeft: dayLabelWidth,
              gap: cellGap,
              height: 18,
            }}
          >
            {weeks.map((week) => (
              <div
                key={week.weekIndex}
                style={{ width: cellSize }}
                className="font-mono text-[10px] text-text-muted"
              >
                {week.monthLabel ?? ""}
              </div>
            ))}
          </div>

          {/* Grid: day labels + 7-row matrix */}
          <div className="flex">
            {/* Day labels column (Mon, Wed, Fri) */}
            <div
              className="flex flex-col"
              style={{ width: dayLabelWidth, gap: cellGap }}
            >
              {["", "Mon", "", "Wed", "", "Fri", ""].map((label, i) => (
                <div
                  key={i}
                  style={{ height: cellSize, lineHeight: `${cellSize}px` }}
                  className="font-mono text-[10px] text-text-muted"
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div className="flex" style={{ gap: cellGap }}>
              {weeks.map((week) => (
                <div
                  key={week.weekIndex}
                  className="flex flex-col"
                  style={{ gap: cellGap }}
                >
                  {week.days.map((day, di) => (
                    <div
                      key={di}
                      title={
                        day
                          ? `${day.count} contributions on ${day.date}`
                          : undefined
                      }
                      style={{
                        width: cellSize,
                        height: cellSize,
                        background: day
                          ? levelToBackground(day.level)
                          : "transparent",
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-2 text-[11px] text-text-muted">
        <span className="font-mono">Less</span>
        <div className="flex" style={{ gap: cellGap }}>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              style={{
                width: cellSize,
                height: cellSize,
                background: levelToBackground(level as 0 | 1 | 2 | 3 | 4),
                borderRadius: 2,
              }}
            />
          ))}
        </div>
        <span className="font-mono">More</span>
      </div>
    </div>
  );
}
