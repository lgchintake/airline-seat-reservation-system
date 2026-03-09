export function FlightCardSkeleton() {
  return (
    <div className="border border-border rounded-lg p-6 space-y-4 animate-pulse">
      <div className="flex justify-between">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-3 w-24 bg-muted rounded" />
        </div>
        <div className="h-6 w-6 bg-muted rounded" />
      </div>
      <div className="space-y-3">
        <div className="h-8 w-20 bg-muted rounded" />
        <div className="h-3 w-full bg-muted rounded" />
        <div className="h-8 w-20 bg-muted rounded" />
      </div>
      <div className="h-10 w-full bg-muted rounded" />
    </div>
  )
}

export function FlightSearchSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <FlightCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function SeatGridSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-48 bg-muted rounded" />
      <div className="flex gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map(row => (
          <div key={row} className="flex gap-3">
            <div className="w-8 h-4 bg-muted rounded" />
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6].map(col => (
                <div
                  key={col}
                  className="w-8 h-8 bg-muted rounded border border-border"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
