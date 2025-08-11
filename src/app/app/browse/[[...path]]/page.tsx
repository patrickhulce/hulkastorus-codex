interface BrowsePageProps {
  params: { path?: string[] };
}

export default function BrowsePage({ params }: BrowsePageProps) {
  const currentPath = (params.path || []).join("/") || "/";
  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold">File Manager – Placeholder</h1>
      <p className="mt-2 text-sm text-gray-500">Browsing: {currentPath}</p>
    </main>
  );
}

