import React, { useState, useEffect } from 'react';
import { Course } from "../../../../api";
import { size, map } from "lodash";
import { CourseItem } from "../CourseItem";
import { Loader } from "semantic-ui-react";

const courseController = new Course();

export function ListCourses() {

    const [courses, setCourses] = useState(false);


    useEffect(() => {
        (async () => {
            try {
                const response = await courseController.getCourses();
                setCourses(response.docs);
            } catch (error) {
                console.error(error);
            }
        })()
    }, [])

    if (!courses) return <Loader active inline="centered" />
    if (size(courses) === 0) return "No hay ningún curso";

    return (
        <div>
            {map(courses, (course) => (
                <CourseItem key={course._id} course={course} />
            ))}
        </div>
    )
}
