export default function PermissionGuard({
  role,
  allowed,
  children,
}) {
  if (!allowed.includes(role)) {
    return null;
  }

  return children;
}