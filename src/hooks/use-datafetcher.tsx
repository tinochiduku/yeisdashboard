import { getData } from "@/utils/requests/dataQuery";
import { useCallback } from "react";

export interface FetchConfig {
  pathname: string;
  id: any;
  setInitialData: (data: any) => void;
  onError?: (error: unknown) => void;
}

export interface RouteConfig {
  path: string;
  idKey: string;
  dataKey: string;
  title: string;
  apiPath: string;
}

// Custom hook for data fetching
export const useDataFetcher = (config: {
  routeConfigs: RouteConfig[];
  defaultErrorHandler?: (error: unknown) => void;
}) => {
  const { routeConfigs, defaultErrorHandler } = config;

  const fetchData = useCallback(async (
    pathname: string, 
    id: string, 
    setInitialData: (data: any) => void,
    customOnError?: (error: unknown) => void
  ) => {
    try {
      const routeConfig = routeConfigs.find(route => route.path === pathname);
      
      if (!routeConfig) return;

      const entityId = id[routeConfig.idKey];
      if (!entityId) {
        throw new Error(`ID not found for ${routeConfig.idKey}`);
      }

      const data = await getData({
        title: routeConfig.title,
        url: `${routeConfig.apiPath}/${entityId}`
      });

      setInitialData({ [routeConfig.dataKey]: data });
    } catch (error) {
      const errorHandler = customOnError || defaultErrorHandler;
      errorHandler?.(error);
    }
  }, [routeConfigs, defaultErrorHandler]);

  return { fetchData };
};