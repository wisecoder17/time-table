import React, { useEffect } from "react";
import { useCourseStore } from "../services/state/courseStore";
import Card from "../components/common/Card";

/**
 * Courses management page
 */
const CoursesPage = () => {
  const { courses, isLoading, error, fetchCourses } = useCourseStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="page-title">Courses</h1>
        <p className="page-subtitle">
          Manage all available courses in the system
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full"></div>
          <p className="text-gray-600 mt-4">Loading courses...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">Error Loading Courses</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      ) : (
        <>
          {courses.length === 0 ? (
            <Card className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-600 text-lg">No courses found</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:scale-105">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {course.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-mono">
                        {course.code}
                      </p>
                    </div>
                    <span className="text-2xl">📖</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesPage;
