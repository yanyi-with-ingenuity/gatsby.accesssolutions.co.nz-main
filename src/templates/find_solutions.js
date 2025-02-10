import React from 'react'
import { useState } from 'react';
import { navigate } from '@reach/router';
import { Link, graphql } from 'gatsby'
import { StaticImage } from "gatsby-plugin-image"
import Header from '../components/header'
import Footer from '../components/footer'

const FindSolution = ({data}) => 
{
    //console.log('data: ', data);

    const [solution, setSolution] = React.useState([]);
    //console.log('solution: ', solution);

    const [formValues, setFormValues] = useState({
        formControls: {
            environment: {
                value: '',
            },
            terrain: {
                value: '',
            },
            job_type: {
                value: '',
            },
            working_height: {
                value: '25',
            },
            weight: {
                value: '9000',
            },
        }
    });

    const [step, setStep] = React.useState({
        step_1: true,
        step_2: false,
        step_3: false,
        step_4: false,
        finish: false,
    });

    const changeHandler = e => 
    {
        const name = e.target.name;
        const value = e.target.value;

        if ( value === 'Not sure? Contact us') {
            //console.log('value: ', value);
            navigate( `/contact-us/`, { replace: true }); 
        }

        const updatedControls = {
            ...formValues.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };
        updatedFormElement.value = value;
        updatedControls[name] = updatedFormElement;

        setFormValues({
            ...formValues,
            formControls: updatedControls,
        });

        //console.log('name: ', name);
        if (name === 'environment') {
            setStep({
                step_1: false,
                step_2: true,
            })
        }
        if (name === 'terrain') {
            setStep({
                step_2: false,
                step_3: true,
            })
        }
        if (name === 'job_type') {
            setStep({
                step_3: false,
                step_4: true,
            })
        }
    }

    const submitHandler = async e => 
    {
        e.preventDefault();
        e.persist();
    
        const formData = {};

        for (let formElementId in formValues.formControls) {
            formData[formElementId] = formValues.formControls[formElementId].value
        }
        //console.log('formData: ', formData);
        //console.log('formData.job_type: ', formData.job_type);

        if (formData.job_type === 'Working at heights') 
        {
            //console.log('Working at heights: True ');
            if (formData.working_height === '') {
                formData.working_height = 25;
                //console.log('formData.working_height: ', formData.working_height);
            }

            let find_solution = data.allMarkdownRemark.edges.filter( 
                entry => {
                    let environment_match = entry.node.frontmatter.spec.environment === formData.environment;
                    environment_match = environment_match || entry.node.frontmatter.spec.environment === "Indoor & Outdoor"

                    let terrain_match = entry.node.frontmatter.spec.terrain === formData.terrain;
                    if (formData.terrain === "Smooth flat surface") {
                        terrain_match = terrain_match || entry.node.frontmatter.spec.terrain === "Uneven or slippery surface"
                    }
                    return (
                        environment_match
                        && terrain_match
                        && entry.node.frontmatter.spec.job_type === formData.job_type
                        && parseFloat(entry.node.frontmatter.spec.working_height) > parseFloat(formData.working_height)
                    )
                }
            );
            find_solution.sort((a, b) => parseFloat(a.node.frontmatter.spec.working_height) > parseFloat(b.node.frontmatter.spec.working_height) ? 1 : -1)
            //console.log('find_solution: ', find_solution);
            setSolution(find_solution);
        }

        if (formData.job_type === 'Lifting & Shifting') 
        {
            if (formData.weight === '') {
                formData.weight = 9000;
            }
            let find_solution = data.allMarkdownRemark.edges.filter( 
                entry => {
                    let environment_match = entry.node.frontmatter.spec.environment === formData.environment;
                    environment_match = environment_match || entry.node.frontmatter.spec.environment === "Indoor & Outdoor"

                    let terrain_match = entry.node.frontmatter.spec.terrain === formData.terrain;
                    if (formData.terrain === "Smooth flat surface") {
                        terrain_match = terrain_match || entry.node.frontmatter.spec.terrain === "Uneven or slippery surface"
                    }

                    return (
                        environment_match
                        && terrain_match
                        && entry.node.frontmatter.spec.job_type === formData.job_type
                        && parseFloat(entry.node.frontmatter.spec.lifting_capacity) >= parseFloat(formData.weight)
                    )
                }
            );
            find_solution.sort((a, b) => parseFloat(a.node.frontmatter.spec.lifting_capacity) > parseFloat(b.node.frontmatter.spec.lifting_capacity) ? 1 : -1)
            //console.log('find_solution: ', find_solution);
            setSolution(find_solution);
        }

        setStep({
            step_4: false,
            finish: true,
        })

        //console.log('formData.working_height: ', formData.working_height);
        //console.log('formData.weight: ', formData.weight);
        //console.log('solution: ', solution);
    }

    return (
        <div className="page">
            <Header />
            <div className="layout grey">
                <div className="steps_container">

                    <div className="steps_padding blue">
                        <div className="flex_steps flex_wrap flex__space-around flex__align-items flex_gap_32 center steps">
                            <div className={step.step_1 ? 'steps_bg steps_active' : 'steps_bg'}>
                                <div className="steps_arrow_mobile">
                                    <StaticImage src="../images/steps_mobile_1.png" alt="Step 1" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </div>
                                <div className="steps_arrow">
                                    <StaticImage src="../images/step_1.png" alt="Step 1" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </div>
                                <h2>Environment</h2>
                            </div>
                            <div className={step.step_2 ? 'steps_bg steps_active' : 'steps_bg'}>
                                <div className="steps_arrow_mobile">
                                    <StaticImage src="../images/steps_mobile_2.png" alt="Step 2" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </div>
                                <div className="steps_arrow">
                                    <StaticImage src="../images/step_2.png" alt="Step 2" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </div>
                                <h2>Terrain</h2>
                            </div>
                            <div className={step.step_3 ? 'steps_bg steps_active' : 'steps_bg'}>
                                <div className="steps_arrow_mobile">
                                    <StaticImage src="../images/steps_mobile_3.png" alt="Step 3" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </div>
                                <div className="steps_arrow">
                                    <StaticImage src="../images/step_3.png" alt="Step 3" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </div>
                                <h2>Job Type</h2>
                            </div>
                            <div className={step.step_4 ? 'steps_bg steps_active' : 'steps_bg'}>
                                <div className="steps_arrow_mobile">
                                    <StaticImage src="../images/steps_mobile_4.png" alt="Step 4" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </div>
                                <div className="steps_arrow">
                                    <StaticImage src="../images/step_4.png" alt="Step 4" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </div>
                                <h2>Weight-Height</h2>
                            </div>
                            <div className={step.finish ? 'steps_bg steps_active' : 'steps_bg'}>
                                <div className="steps_arrow_mobile">
                                    <StaticImage src="../images/steps_mobile_5.png" alt="Step 5" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </div>
                                <div className="steps_arrow">
                                    <StaticImage src="../images/step_5.png" alt="Step 5" style={{ width: '100%', height: '100%', display: "block" }} imgStyle={{ objectFit: "contain" }} />
                                </div>
                                <h2>Your Options</h2>
                            </div>
                        </div>
                    </div>
                    <form method="post" onSubmit={submitHandler} action="" className="steps_form">
                        <div className={step.step_1 ? 'show' : 'hide'}>
                            <div className="flex flex__space-around flex__align-items gap_128 center">
                                <div className="field_margin">
                                    <label htmlFor="indoor" className="radio_field">
                                        <StaticImage src="../images/indoor.png" alt="Indoor" style={{ display: "block", margin: "0 0 1em 0" }} imgStyle={{ objectFit: "contain" }} />
                                        <svg className="radio_icon" viewBox="0 0 460.5 531.74" overflow="visible" enableBackground="new 0 0 460.5 531.74">
                                            <polygon stroke="#000000" points="0.5,0.866 459.5,265.87 0.5,530.874 "/>
                                        </svg>
                                        Indoors
                                    </label>
                                    <input id="indoor" type="radio" name="environment" value="Indoor" onChange={changeHandler} className="radio_hidden" />
                                </div>
                                <div className="field_margin">
                                    <label htmlFor="outdoor" className="radio_field">
                                        <StaticImage src="../images/outdoor.png" alt="Outdoor" style={{ display: "block", margin: "0 0 1em 0" }} imgStyle={{ objectFit: "contain" }} />
                                        <svg className="radio_icon" viewBox="0 0 460.5 531.74" overflow="visible" enableBackground="new 0 0 460.5 531.74">
                                            <polygon stroke="#000000" points="0.5,0.866 459.5,265.87 0.5,530.874 "/>
                                        </svg>
                                        Outdoors
                                    </label>
                                    <input id="outdoor" type="radio" name="environment" value="Outdoor" onChange={changeHandler} className="radio_hidden" />
                                </div>
                                <div>
                                    <label htmlFor="indoor_and_outdoor" className="radio_field">
                                        <StaticImage src="../images/indoor_and_outdoor.png" alt="Indoor and outdoor" style={{ display: "block", margin: "0 0 1em 0" }} imgStyle={{ objectFit: "contain" }} />
                                        <svg className="radio_icon" viewBox="0 0 460.5 531.74" overflow="visible" enableBackground="new 0 0 460.5 531.74">
                                            <polygon stroke="#000000" points="0.5,0.866 459.5,265.87 0.5,530.874 "/>
                                        </svg>
                                        Indoors and outdoors
                                    </label>
                                    <input id="indoor_and_outdoor" type="radio" name="environment" value="Indoor & outdoor" onChange={changeHandler} className="radio_hidden" />
                                </div>
                            </div>
                        </div>
                        <div className={step.step_2 ? 'show' : 'hide'}>
                            <div className="flex flex__space-around flex__align_bottom gap_64 center">
                                <div className="flex_30 field_margin">
                                    <label htmlFor="smooth_flat_surface" className="radio_field">
                                        <StaticImage src="../images/smooth_flat_surface.png" alt="Smooth flat surface" style={{ display: "block", margin: "0 0 1em 0" }} imgStyle={{ objectFit: "contain" }} />
                                        <svg className="radio_icon" viewBox="0 0 460.5 531.74" overflow="visible" enableBackground="new 0 0 460.5 531.74">
                                            <polygon stroke="#000000" points="0.5,0.866 459.5,265.87 0.5,530.874 "/>
                                        </svg>
                                        Smooth flat surface
                                    </label>
                                    <input id="smooth_flat_surface" type="radio" name="terrain" value="Smooth flat surface" onChange={changeHandler} className="radio_hidden" />
                                </div>
                                <div className="flex_30 field_margin">
                                    <label htmlFor="uneven_or_slippery_surface" className="radio_field">
                                        <StaticImage src="../images/uneven_or_slippery_surface.png" alt="Uneven or slippery surface" style={{ display: "block", margin: "0 0 1em 0" }} imgStyle={{ objectFit: "contain" }} />
                                        <svg className="radio_icon" viewBox="0 0 460.5 531.74" overflow="visible" enableBackground="new 0 0 460.5 531.74">
                                            <polygon stroke="#000000" points="0.5,0.866 459.5,265.87 0.5,530.874 "/>
                                        </svg>
                                        Uneven or slippery surface
                                    </label>
                                    <input id="uneven_or_slippery_surface" type="radio" name="terrain" value="Uneven or slippery surface" onChange={changeHandler} className="radio_hidden" />
                                </div>
                                <div className="flex_30">
                                    <label htmlFor="not_sure_terrain" className="radio_field">
                                        <StaticImage src="../images/contact_us.png" alt="Contact us" style={{ display: "block", margin: "0 0 1em 0" }} imgStyle={{ objectFit: "contain" }} />
                                        <svg className="radio_icon" viewBox="0 0 460.5 531.74" overflow="visible" enableBackground="new 0 0 460.5 531.74">
                                            <polygon stroke="#000000" points="0.5,0.866 459.5,265.87 0.5,530.874 "/>
                                        </svg>
                                        Not sure? Contact us
                                    </label>
                                    <input id="not_sure_terrain" type="radio" name="terrain" value="Not sure? Contact us" onChange={changeHandler} className="radio_hidden" />
                                </div>
                            </div>
                        </div>
                        <div className={step.step_3 ? 'show' : 'hide'}>
                            <div className="flex flex__space-around flex__align_bottom gap_64 center">
                                <div className="flex_20 field_margin">
                                    <label htmlFor="working_at_heights" className="radio_field">
                                        <StaticImage src="../images/working_at_heights.png" alt="Working at heights" style={{ display: "block", margin: "0 0 1em 0" }} imgStyle={{ objectFit: "contain" }} />
                                        Working at heights
                                    </label>
                                    <input id="working_at_heights" type="radio" name="job_type" value="Working at heights" onChange={changeHandler} className="radio_hidden" />
                                </div>
                                <div className="flex_20 field_margin">
                                    <label htmlFor="lifting_and_shifting" className="radio_field">
                                        <StaticImage src="../images/lifting_and_shifting.png" alt="Lifting and shifting" style={{ display: "block", margin: "0 0 1em 0" }} imgStyle={{ objectFit: "contain" }} />
                                        Lifting and shifting
                                    </label>
                                    <input id="lifting_and_shifting" type="radio" name="job_type" value="Lifting & Shifting" onChange={changeHandler} className="radio_hidden" />
                                </div>
                                <div className="flex_20">
                                    <label htmlFor="not_sure_job_type" className="radio_field">
                                        <StaticImage src="../images/contact_us.png" alt="Contact us" style={{ display: "block", margin: "0 0 1em 0" }} imgStyle={{ objectFit: "contain" }} />
                                        Not sure? Contact us
                                    </label>
                                    <input id="not_sure_job_type" type="radio" name="job_type" value="Not sure? Contact us" onChange={changeHandler} className="radio_hidden" />
                                </div>
                            </div>
                        </div>
                        <div className={step.step_4 ? 'show' : 'hide'}>
                            <div className={formValues.formControls.job_type.value === 'Working at heights' ? 'show' : 'hide'}>
                                <div className="steps_slider_text center">
                                    <label htmlFor="working_height" className="steps_slider_label">
                                        <svg className="radio_icon" viewBox="0 0 460.5 531.74" overflow="visible" enableBackground="new 0 0 460.5 531.74">
                                            <polygon stroke="#000000" points="0.5,0.866 459.5,265.87 0.5,530.874 "/>
                                        </svg>
                                        Maximum height slide
                                    </label>
                                    <div>
                                        <span className="steps_slider_text_bottom">1 metre</span> &nbsp; <input className="steps_slider" id="working_height" type="range" name="working_height" min="1" defaultValue="25" max="50" step="1" onChange={changeHandler} /> &nbsp; <span className="steps_slider_text_top">50 metre</span>
                                    </div>
                                    <p>{formValues.formControls.working_height.value} metre</p>
                                </div>
                            </div>
                            <div className={formValues.formControls.job_type.value === 'Lifting & Shifting' ? 'show' : 'hide'}>
                                <div className="steps_slider_text center">
                                    <label htmlFor="weight" className="steps_slider_label">
                                        <svg className="radio_icon" viewBox="0 0 460.5 531.74" overflow="visible" enableBackground="new 0 0 460.5 531.74">
                                            <polygon stroke="#000000" points="0.5,0.866 459.5,265.87 0.5,530.874 "/>
                                        </svg>
                                        Max weight
                                    </label>
                                    <div>
                                        <span className="steps_slider_text_bottom">1,000 kgs</span> &nbsp; <input className="steps_slider" id="weight" type="range" name="weight" min="1000" defaultValue="9000" max="18000" step="100" onChange={changeHandler} /> &nbsp; <span className="steps_slider_text_top">18,000 kgs</span>
                                    </div>
                                    <p>{formValues.formControls.weight.value} kgs</p>
                                </div>
                            </div>
                            <div className="center">
                                <button type="submit" className="steps_btn">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className={step.finish ? 'show' : 'hide'}>
                        <div className="steps_form">
                            <div className="center">
                            <StaticImage src="../images/step_by_step.png" alt="Step by step" style={{ display: "inline-block" }} imgStyle={{ objectFit: "contain" }} /> <h1>Your Options</h1>
                            </div>
                            <table className="data_solutions" border="0" cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th className="t_30">Name</th>
                                        <th className="t_10">Platform Size</th>
                                        <th className="t_10">Working Height</th>
                                        <th className="t_10">{formValues.formControls.job_type.value == 'Working at heights' ? 'Platform Capacity' : 'Lifting Capacity'}</th>
                                        <th className="t_10">Overall Width</th>
                                        <th className="t_10">Weight</th>
                                        <th className="t_10">Platform Height</th>
                                        <th className="t_10">Specs</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {solution.map((entry, i) => {
                                        if (i < 6) {
                                            return (
                                                <tr key={`data_` + i}>
                                                    <td data-label="Name:&nbsp;">
                                                        <Link to={entry.node.fields.slug}>{entry.node.frontmatter.heading}</Link>
                                                    </td>
                                                    <td data-label="Platform Size:&nbsp;">{entry.node.frontmatter.spec.platform_length !== null ? `` + entry.node.frontmatter.spec.platform_length + ` x ` : '-'} {entry.node.frontmatter.spec.platform_width !== null ? entry.node.frontmatter.spec.platform_width : ''}</td>
                                                    <td data-label="Working Height:&nbsp;">{entry.node.frontmatter.spec.working_height !== null ? `` + entry.node.frontmatter.spec.working_height + ` m` : '-'}</td>
                                                    {entry.node.frontmatter.spec.platform_capacity && 
                                                        <td data-label="Platform Capacity:&nbsp;">{entry.node.frontmatter.spec.platform_capacity !== null ? `` + entry.node.frontmatter.spec.platform_capacity + ` kg` : '-'}</td>
                                                    }
                                                    {entry.node.frontmatter.spec.lifting_capacity && 
                                                        <td data-label="Lifting Capacity:&nbsp;">{entry.node.frontmatter.spec.lifting_capacity !== null ? `` + entry.node.frontmatter.spec.lifting_capacity + ` kg` : '-'}</td>
                                                    }
                                                    <td data-label="Overall Width:&nbsp;">{entry.node.frontmatter.spec.overall_width !== null ? `` + entry.node.frontmatter.spec.overall_width + ` m` : '-'}</td>
                                                    <td data-label="Weight:&nbsp;">{entry.node.frontmatter.spec.weight !== null ? `` + entry.node.frontmatter.spec.weight + ` kg` : '-'}</td>
                                                    <td data-label="Platform Height:&nbsp;">{entry.node.frontmatter.spec.platform_height !== null ? `` + entry.node.frontmatter.spec.platform_height + ` m` : '-'}</td>
                                                    <td data-label="Specs:&nbsp;">
                                                        {entry.node.frontmatter.spec.pdf !== null && 
                                                        <a href={`/images/uploads/${entry.node.frontmatter.spec.pdf.name}.pdf`} rel="noopener nofollow noreferrer" target="_blank">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="btn_arrow" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                                                        </svg>
                                                        PDF
                                                        </a>
                                                    }
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    })}
                                    {solution < 1 &&
                                        <tr>
                                            <td colSpan="8" className="steps_none center">
                                                <p>Your search criteria doesn’t match with a specific machine that we have available. However we do have a range of machines that will be able to do the job, please contact one of our team on <a href="tel:0800653343" title="0800 653 343" rel="nofollow noopener">0800 653 343</a> to discuss your project needs.</p>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default FindSolution;

export const query = graphql`
	query {
        allMarkdownRemark(filter: {frontmatter: {product: {eq: "equipment"}}}) {
            edges {
                node {
                    frontmatter {
                        spec {
                            brand
                            environment
                            fuel_type
                            horizontal_reach
                            job_type
                            lifting_capacity
                            model
                            overall_height
                            overall_width
                            platform_capacity
                            platform_height
                            platform_length
                            platform_width
                            terrain
                            up_over_height
                            weight
                            working_height
                            pdf {
                                name
                            }
                            category
                        }
                        heading
                    }
                    fields {
                        slug
                    }
                }
            }
        }
    }
`


