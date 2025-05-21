import { appwriteConfig, database } from "./client";

interface Document {
  [key: string]: any;
}

interface DashboardStats {
  totalUsers: number;
  usersJoined: {
    currentMonth: number;
    lastMonth: number;
  };
  userRole: {
    total: number;
    currentMonth: number;
    lastMonth: number;
  };
  tripStats: {
    totalTrips: number;
    tripsCreated: {
      currentMonth: number;
      lastMonth: number;
    };
  };
}

type FilterByDate = (
  items: Document[],
  key: string,
  start: string,
  end?: string
) => number;

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
  const d = new Date();

  const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
  const startPrev = new Date(
    d.getFullYear(),
    d.getMonth() - 1,
    1
  ).toISOString();
  const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString(); // Fix: was d.getMonth() - 1

  // Get users and trips
  const [users, trips] = await Promise.all([
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    ),
    database.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId
    ),
  ]);

  // Fix: item[] is invalid, should be item[key]
  const filterByDate: FilterByDate = (items, key, start, end) =>
    items.filter((item) => item[key] >= start && (!end || item[key] <= end))
      .length;

  const filterUsersByRole = (role: string) => {
    return users.documents.filter((u: Document) => u.status === role);
  };

  return {
    totalUsers: users.total,
    usersJoined: {
      currentMonth: filterByDate(users.documents, "joinedAt", startCurrent),
      lastMonth: filterByDate(users.documents, "joinedAt", startPrev, endPrev),
    },
    userRole: {
      total: filterUsersByRole("user").length,
      currentMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startCurrent
      ),
      lastMonth: filterByDate(
        filterUsersByRole("user"),
        "joinedAt",
        startPrev,
        endPrev
      ), // Fix: was filtering from full user list
    },
    tripStats: {
      // Fix: was named `userRole` again (copy-paste error)
      totalTrips: trips.total,
      tripsCreated: {
        currentMonth: filterByDate(trips.documents, "createdAt", startCurrent),
        lastMonth: filterByDate(
          trips.documents,
          "createdAt",
          startPrev,
          endPrev
        ), // Fix: was filtering users by joinedAt
      },
    },
  };
};
