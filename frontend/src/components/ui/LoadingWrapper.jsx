export default function LoadingWrapper({
  loading,
  loader,
  children,
}) {
  if (loading) {
    return loader;
  }

  return children;
}