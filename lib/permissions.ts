import type { Profile, Role } from "@/types";

export function hasMinimumRole(role: Role, allowedRoles: Role[]) {
  return allowedRoles.includes(role);
}

export function canCreatePost(profile: Profile | null) {
  return profile ? hasMinimumRole(profile.role, ["author", "admin"]) : false;
}

export function canAccessCommentsDashboard(profile: Profile | null) {
  return profile ? hasMinimumRole(profile.role, ["author", "admin"]) : false;
}

export function canEditPost(profile: Profile | null, authorId: string) {
  if (!profile) {
    return false;
  }

  if (profile.role === "admin") {
    return true;
  }

  return profile.role === "author" && profile.id === authorId;
}

export function canDeletePost(profile: Profile | null) {
  return profile?.role === "admin";
}
