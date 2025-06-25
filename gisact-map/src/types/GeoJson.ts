export interface GeoJSONFeature {
  type: "Feature";
  properties: Record<string, any>;
  geometry: {
    type: string;
    coordinates: any;
  };
}

export interface GeoJSONFeatureCollection {
  type: "FeatureCollection";
  name?: string;
  features: GeoJSONFeature[];
}
