import type { Thing, WithContext } from 'schema-dts';

interface StructuredDataProps<T extends Thing> {
  data: WithContext<T>;
}

export const StructuredData = <T extends Thing>({ data }: StructuredDataProps<T>) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(data),
    }}
  />
);