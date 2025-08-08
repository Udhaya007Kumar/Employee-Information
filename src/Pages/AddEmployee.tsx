import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import type { Employee } from "../Types/Employee";
import { useAppDispatch } from "../Store/hooks";
import { addEmployee } from "../Features/EmployeeSlice";

const levels = ["Junior", "Mid", "Senior", "Lead", "Manager"];
const proficiencies = [1, 2, 3, 4, 5];

const AddEmployee = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Employee>({
    id: uuidv4(),
    firstName: "",
    lastName: "",
    email: "",
    role: { id: uuidv4(), title: "", level: "Junior" },
    department: { id: uuidv4(), name: "", description: "" },
    experienceYears: 0,
    specialization: [],
    salary: 0,
    location: "",
    startDate: new Date(),
    skills: [{ id: uuidv4(), name: "", proficiency: 1 }],
    performanceRating: 0,
    isActive: true,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSkillChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedSkills = [...prev.skills];
      updatedSkills[index] = {
        ...updatedSkills[index],
        [name]: name === "proficiency" ? parseInt(value) : value,
      };
      return { ...prev, skills: updatedSkills };
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.department.name) newErrors.department = "Department is required";
    if (formData.salary <= 0) newErrors.salary = "Salary must be positive";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSuccess(false);

    await new Promise((res) => setTimeout(res, 1000)); // Simulated delay

    dispatch(addEmployee({ ...formData, id: uuidv4() }));
    setIsSubmitting(false);
    setSuccess(true);

    setTimeout(() => {
      navigate("/employees");
    }, 1500);
  };

  return (
     <div className="flex justify-center  min-h-screen bg-gray-100 px-3">
    <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
        Add New Employee
      </h2>

      {success && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded text-green-700 font-semibold text-center">
          ✅ Employee added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6" noValidate>
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold mb-2 text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full rounded-md border px-4 py-2 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
            type="text"
            placeholder="Enter first name"
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold mb-2 text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full rounded-md border px-4 py-2 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
            type="text"
            placeholder="Enter last name"
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.lastName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className={`w-full rounded-md border px-4 py-2 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              ${errors.email ? "border-red-500" : "border-gray-300"}`}
            placeholder="you@example.com"
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-semibold mb-2 text-gray-700">
            Location
          </label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="City or Office Location"
            autoComplete="address-level2"
          />
        </div>

        {/* Department Name */}
        <div>
          <label htmlFor="department.name" className="block text-sm font-semibold mb-2 text-gray-700">
            Department Name
          </label>
          <input
            id="department.name"
            name="department.name"
            value={formData.department.name}
            onChange={handleChange}
            type="text"
            className={`w-full rounded-md border px-4 py-2 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              ${errors.department ? "border-red-500" : "border-gray-300"}`}
            placeholder="Department"
            autoComplete="organization"
          />
          {errors.department && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.department}</p>
          )}
        </div>

        {/* Department Description */}
        <div>
          <label htmlFor="department.description" className="block text-sm font-semibold mb-2 text-gray-700">
            Department Description
          </label>
          <input
            id="department.description"
            name="department.description"
            value={formData.department.description}
            onChange={handleChange}
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Optional description"
          />
        </div>

        {/* Role Title */}
        <div>
          <label htmlFor="role.title" className="block text-sm font-semibold mb-2 text-gray-700">
            Role Title
          </label>
          <input
            id="role.title"
            name="role.title"
            value={formData.role.title}
            onChange={handleChange}
            type="text"
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Role Title"
          />
        </div>

        {/* Role Level */}
        <div>
          <label htmlFor="role.level" className="block text-sm font-semibold mb-2 text-gray-700">
            Role Level
          </label>
          <select
            id="role.level"
            name="role.level"
            value={formData.role.level}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div>
          <label htmlFor="experienceYears" className="block text-sm font-semibold mb-2 text-gray-700">
            Experience (Years)
          </label>
          <input
            id="experienceYears"
            name="experienceYears"
            type="number"
            min={0}
            value={formData.experienceYears}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Number of years"
          />
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block text-sm font-semibold mb-2 text-gray-700">
            Salary
          </label>
          <input
            id="salary"
            name="salary"
            type="number"
            min={0}
            value={formData.salary}
            onChange={handleChange}
            className={`w-full rounded-md border px-4 py-2 text-gray-900 placeholder-gray-400 transition
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              ${errors.salary ? "border-red-500" : "border-gray-300"}`}
            placeholder="Salary amount"
          />
          {errors.salary && (
            <p className="mt-1 text-xs text-red-600 font-medium">{errors.salary}</p>
          )}
        </div>

        {/* Skills */}
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-semibold mb-3 text-gray-700">
            Skills
          </label>
          {formData.skills.map((skill, index) => (
            <div key={skill.id} className="flex gap-4 mb-3">
              <input
                name="name"
                value={skill.name}
                onChange={(e) => handleSkillChange(e, index)}
                placeholder="Skill Name"
                className="flex-grow rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 transition
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <select
                name="proficiency"
                value={skill.proficiency}
                onChange={(e) => handleSkillChange(e, index)}
                className="w-24 rounded-md border border-gray-300 px-3 py-2 text-gray-700 transition
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {proficiencies.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="col-span-1 sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-3 rounded-md py-2 font-semibold text-white transition
            ${isSubmitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {isSubmitting && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none" viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            )}
            {isSubmitting ? "Submitting..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default AddEmployee;
