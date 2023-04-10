import React, { useState, useEffect } from 'react';
import { Course } from "../../../../api";
import { size, map } from "lodash";
import { CourseItem } from "../CourseItem";
import { Loader, Pagination } from "semantic-ui-react";
import "./ListCourses.scss";

const courseController = new Course();

export function ListCourses() {

    const [courses, setCourses] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState();


    useEffect(() => {
        (async () => {
            try {
                const response = await courseController.getCourses({ page, limit: 5 });
                setCourses(response.docs);
                setPagination({
                    limit: response.limit,
                    page: response.page,
                    pages: response.pages,
                    total: response.total
                });
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    if (!courses) return <Loader active inline="centered" />
    if (size(courses) === 0) return "No hay ningún curso";

    return (
        <div className='list-courses'>
            {map(courses, (course) => (
                <CourseItem key={course._id} course={course} />
            ))}

            <div className='list-courses__pagination'>
                <Pagination totalPages={pagination.pages} defaultActivePage={pagination.pages} ellipsisItem={null} firstItem={null} lastItem={null} onPageChange={() => { console.log("Pagination") }} />
            </div>
        </div>
    )
}
