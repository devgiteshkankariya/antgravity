export const calculateProjectedDates = (
  startDate: string,
  weeklyHours: number,
  completedWeeksCount: number
): {
  projectedDurationDays: number;
  projectedFinishDate: string;
  paceDescription: string;
} => {
  // Baseline hours: 115 hours total for Phase 1
  const totalPhase1Hours = 115;
  const hoursRemaining = Math.max(0, totalPhase1Hours - completedWeeksCount * 8.8);

  let paceMultiplier = 1;
  let paceDescription = 'Standard Fast Track (~9 hrs/week, 90 Days)';

  if (weeklyHours <= 3.5) {
    paceMultiplier = 2.33; // ~210 days
    paceDescription = 'Sustainable Deep Track (~3 hrs/week, ~210 Days)';
  } else if (weeklyHours <= 6) {
    paceMultiplier = 1.66; // ~150 days
    paceDescription = 'Balanced Working Track (~5 hrs/week, ~150 Days)';
  }

  const projectedDurationDays = Math.round(90 * paceMultiplier);

  const start = startDate ? new Date(startDate) : new Date();
  const projectedFinish = new Date(start);
  projectedFinish.setDate(projectedFinish.getDate() + projectedDurationDays);

  return {
    projectedDurationDays,
    projectedFinishDate: projectedFinish.toISOString().split('T')[0],
    paceDescription
  };
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Not set';
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
};
