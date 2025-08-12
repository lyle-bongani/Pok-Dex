import React, { useEffect, useState } from 'react';
import { PERFORMANCE_METRICS } from '../services/seoService';
import { trackPerformanceMetric } from '../services/analyticsService';

interface PerformanceData {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
  tti: number | null;
}

const PerformanceMonitor: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<PerformanceData>({
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    tti: null
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when explicitly enabled
    if (process.env.NODE_ENV === 'development' || process.env.REACT_APP_SHOW_PERFORMANCE === 'true') {
      setIsVisible(true);
    }

    // Track Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      setPerformanceData(prev => ({ ...prev, ttfb }));
      trackPerformanceMetric('TTFB', ttfb);
    }

    // Track Core Web Vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const lcp = lastEntry.startTime;
          setPerformanceData(prev => ({ ...prev, lcp }));
          trackPerformanceMetric('LCP', lcp);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          const fid = entry.processingStart - entry.startTime;
          setPerformanceData(prev => ({ ...prev, fid }));
          trackPerformanceMetric('FID', fid);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        setPerformanceData(prev => ({ ...prev, cls: clsValue }));
        trackPerformanceMetric('CLS', clsValue);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Time to Interactive (estimated)
      const ttiObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          const tti = lastEntry.startTime;
          setPerformanceData(prev => ({ ...prev, tti }));
          trackPerformanceMetric('TTI', tti);
        }
      });
      ttiObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      return () => {
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
        ttiObserver.disconnect();
      };
    }
  }, []);

  const getPerformanceColor = (metric: keyof PerformanceData, value: number | null) => {
    if (value === null) return 'text-gray-400';
    
    const thresholds = {
      lcp: PERFORMANCE_METRICS.LCP_THRESHOLD,
      fid: PERFORMANCE_METRICS.FID_THRESHOLD,
      cls: PERFORMANCE_METRICS.CLS_THRESHOLD,
      ttfb: PERFORMANCE_METRICS.TTFB_THRESHOLD,
      tti: PERFORMANCE_METRICS.TTI_THRESHOLD
    };

    const threshold = thresholds[metric];
    if (value <= threshold * 0.75) return 'text-green-500';
    if (value <= threshold) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getPerformanceStatus = (metric: keyof PerformanceData, value: number | null) => {
    if (value === null) return 'Loading...';
    
    const thresholds = {
      lcp: PERFORMANCE_METRICS.LCP_THRESHOLD,
      fid: PERFORMANCE_METRICS.FID_THRESHOLD,
      cls: PERFORMANCE_METRICS.CLS_THRESHOLD,
      ttfb: PERFORMANCE_METRICS.TTFB_THRESHOLD,
      tti: PERFORMANCE_METRICS.TTI_THRESHOLD
    };

    const threshold = thresholds[metric];
    if (value <= threshold * 0.75) return 'Good';
    if (value <= threshold) return 'Needs Improvement';
    return 'Poor';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 z-50 max-w-sm">
      <h3 className="text-sm font-bold text-gray-800 mb-2">Performance Monitor</h3>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">LCP:</span>
          <span className={getPerformanceColor('lcp', performanceData.lcp)}>
            {performanceData.lcp ? `${Math.round(performanceData.lcp)}ms` : 'Loading...'}
          </span>
          <span className="text-gray-500">
            {performanceData.lcp ? getPerformanceStatus('lcp', performanceData.lcp) : ''}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">FID:</span>
          <span className={getPerformanceColor('fid', performanceData.fid)}>
            {performanceData.fid ? `${Math.round(performanceData.fid)}ms` : 'Loading...'}
          </span>
          <span className="text-gray-500">
            {performanceData.fid ? getPerformanceStatus('fid', performanceData.fid) : ''}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">CLS:</span>
          <span className={getPerformanceColor('cls', performanceData.cls)}>
            {performanceData.cls ? performanceData.cls.toFixed(3) : 'Loading...'}
          </span>
          <span className="text-gray-500">
            {performanceData.cls ? getPerformanceStatus('cls', performanceData.cls) : ''}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">TTFB:</span>
          <span className={getPerformanceColor('ttfb', performanceData.ttfb)}>
            {performanceData.ttfb ? `${Math.round(performanceData.ttfb)}ms` : 'Loading...'}
          </span>
          <span className="text-gray-500">
            {performanceData.ttfb ? getPerformanceStatus('ttfb', performanceData.ttfb) : ''}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">TTI:</span>
          <span className={getPerformanceColor('tti', performanceData.tti)}>
            {performanceData.tti ? `${Math.round(performanceData.tti)}ms` : 'Loading...'}
          </span>
          <span className="text-gray-500">
            {performanceData.tti ? getPerformanceStatus('tti', performanceData.tti) : ''}
          </span>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-200">
        <button
          onClick={() => setIsVisible(false)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Hide Monitor
        </button>
      </div>
    </div>
  );
};

export default PerformanceMonitor; 