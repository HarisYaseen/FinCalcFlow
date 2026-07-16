import React, { useState, useRef } from 'react';

/**
 * Helper to format currency values nicely
 */
const formatVal = (val, currencySymbol) => {
  if (val >= 1000000) {
    return `${currencySymbol}${(val / 1000000).toFixed(1)}M`;
  }
  if (val >= 1000) {
    return `${currencySymbol}${(val / 1000).toFixed(0)}k`;
  }
  return `${currencySymbol}${val.toFixed(0)}`;
};

/**
 * 1. Line Chart Component
 * Visualizes Buyer Net Worth vs Renter Net Worth over time.
 * Supports hover tooltips and area gradients.
 */
export const LineChart = ({ data, currencySymbol, xKey, yKeys, labels, colors }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const svgRef = useRef(null);

  if (!data || data.length === 0) return null;

  const width = 600;
  const height = 300;
  const paddingLeft = 60;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  // Find Min and Max
  const allValues = data.flatMap(d => yKeys.map(k => d[k]));
  const minY = Math.min(0, ...allValues);
  const maxY = Math.max(...allValues) * 1.1 || 100; // 10% padding on top

  // Helper to map data point to SVG coordinate
  const getX = (index) => {
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val) => {
    const ratio = (val - minY) / (maxY - minY);
    return height - paddingBottom - ratio * chartHeight;
  };

  // Generate SVG path for a line
  const generatePath = (key) => {
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[key])}`).join(' ');
  };

  // Generate SVG path for filled area under the line
  const generateAreaPath = (key) => {
    const linePath = generatePath(key);
    const startX = getX(0);
    const endX = getX(data.length - 1);
    const zeroY = getY(Math.max(0, minY));
    return `${linePath} L ${endX} ${zeroY} L ${startX} ${zeroY} Z`;
  };

  // Handle hover interactions
  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    // Convert mouseX back to data index
    const relativeX = mouseX - (paddingLeft / rect.width) * width;
    const scaleX = rect.width / width;
    const dataWidth = chartWidth * scaleX;
    const fraction = relativeX / dataWidth;
    
    let index = Math.round(fraction * (data.length - 1));
    index = Math.max(0, Math.min(data.length - 1, index));
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  // Grid lines
  const gridTicks = 5;
  const yTicks = Array.from({ length: gridTicks }, (_, i) => minY + (i * (maxY - minY)) / (gridTicks - 1));
  const xTicks = data.filter((_, i) => i === 0 || i === data.length - 1 || (data.length > 10 ? i % 5 === 0 : i % 2 === 0));

  return (
    <div className="relative w-full bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          {yKeys.map((key, i) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }}></span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{labels[i]}</span>
            </div>
          ))}
        </div>
        {hoverIndex !== null && (
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Year {data[hoverIndex][xKey]}:{' '}
            {yKeys.map((key, i) => (
              <span key={key} className="ml-2 font-bold" style={{ color: colors[i] }}>
                {formatVal(data[hoverIndex][key], currencySymbol)}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            {colors.map((color, i) => (
              <linearGradient key={i} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={color} stopOpacity="0.0" />
              </linearGradient>
            ))}
          </defs>

          {/* Y Axis Grid Lines & Labels */}
          {yTicks.map((tick, i) => {
            const y = getY(tick);
            return (
              <g key={i} className="opacity-40 dark:opacity-20">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#64748b"
                  fontSize="10"
                  fontWeight="500"
                >
                  {formatVal(tick, currencySymbol)}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {xTicks.map((d, i) => {
            const index = data.indexOf(d);
            const x = getX(index);
            return (
              <text
                key={i}
                x={x}
                y={height - paddingBottom + 20}
                textAnchor="middle"
                fill="#64748b"
                fontSize="10"
                fontWeight="500"
                className="opacity-85"
              >
                Yr {d[xKey]}
              </text>
            );
          })}

          {/* Draw Filled Areas */}
          {yKeys.map((key, i) => (
            <path
              key={`area-${key}`}
              d={generateAreaPath(key)}
              fill={`url(#grad-${i})`}
            />
          ))}

          {/* Draw Lines */}
          {yKeys.map((key, i) => (
            <path
              key={`line-${key}`}
              d={generatePath(key)}
              fill="none"
              stroke={colors[i]}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}

          {/* Hover interaction vertical bar */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={paddingTop}
                x2={getX(hoverIndex)}
                y2={height - paddingBottom}
                stroke="#64748b"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              {yKeys.map((key, i) => (
                <circle
                  key={`dot-${key}`}
                  cx={getX(hoverIndex)}
                  cy={getY(data[hoverIndex][key])}
                  r="5"
                  fill={colors[i]}
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="shadow-sm"
                />
              ))}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. Pie Chart Component
 * Visualizes Cost breakdown (e.g. Fuel vs Fixed vs Maintenance).
 * Uses SVG circles/arcs for clean rendering.
 */
export const PieChart = ({ data, currencySymbol }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-dashed border-slate-200 text-slate-400">
        No costs to display. Enter operations details.
      </div>
    );
  }

  let accumulatedAngle = 0;
  const radius = 70;
  const cx = 100;
  const cy = 100;

  const slices = data.map((slice) => {
    const percentage = slice.value / total;
    const angle = percentage * 360;
    
    // Convert polar coordinates to Cartesian coordinates
    const getCoordinatesForPercent = (percent) => {
      const x = cx + Math.cos(2 * Math.PI * percent) * radius;
      const y = cy + Math.sin(2 * Math.PI * percent) * radius;
      return [x, y];
    };

    const startPercent = accumulatedAngle / 360;
    accumulatedAngle += angle;
    const endPercent = accumulatedAngle / 360;

    const [startX, startY] = getCoordinatesForPercent(startPercent);
    const [endX, endY] = getCoordinatesForPercent(endPercent);

    const largeArcFlag = percentage > 0.5 ? 1 : 0;

    const pathData = [
      `M ${cx} ${cy}`,
      `L ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      'Z'
    ].join(' ');

    return {
      ...slice,
      percentage: (percentage * 100).toFixed(1),
      pathData,
    };
  });

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
          {slices.map((slice, idx) => (
            <path
              key={idx}
              d={slice.pathData}
              fill={slice.color}
              className="transition-all duration-300 hover:opacity-90 cursor-pointer"
            >
              <title>{`${slice.name}: ${formatVal(slice.value, currencySymbol)} (${slice.percentage}%)`}</title>
            </path>
          ))}
          {/* Inner hole for a donut chart style */}
          <circle cx={cx} cy={cy} r="45" fill="white" className="dark:fill-slate-900" />
          <g transform={`rotate(90, ${cx}, ${cy})`}>
            <text x={cx} y={cy - 4} textAnchor="middle" fill="#64748b" className="text-[10px] font-semibold dark:fill-slate-400">TOTAL</text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill="#0f172a" className="text-xs font-bold dark:fill-slate-100">
              {formatVal(total, currencySymbol)}
            </text>
          </g>
        </svg>
      </div>

      <div className="flex-1 w-full space-y-3">
        {slices.map((slice, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="flex items-center gap-3">
              <span className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-800 shadow-sm" style={{ backgroundColor: slice.color }}></span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{slice.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{formatVal(slice.value, currencySymbol)}</span>
              <span className="text-xs text-slate-400 block">{slice.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * 3. Comparison Bar Chart Component
 * Visualizes existing debt interest vs consolidated interest.
 */
export const BarChart = ({ data, currencySymbol }) => {
  const maxVal = Math.max(...data.map(d => d.value)) * 1.15 || 100;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="space-y-6">
        {data.map((bar, idx) => {
          const widthPercent = Math.max(8, (bar.value / maxVal) * 100);
          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{bar.label}</span>
                <span className="text-base font-extrabold text-slate-950 dark:text-slate-50">
                  {formatVal(bar.value, currencySymbol)}
                </span>
              </div>
              <div className="h-6 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out shadow-sm flex items-center justify-end px-3"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: bar.color,
                  }}
                >
                  {widthPercent > 20 && (
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                      {((bar.value / (data[0].value || 1)) * 100).toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
