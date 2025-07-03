import { useState } from "react";
import { Check, Search, Sparkles } from "lucide-react";
import Form from "./components/Form";
import Input from "./components/Input";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import DataTable from "./components/DataTable";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const AppContent = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    newsletter: false,
    terms: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Table data
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "User",
      status: "Active",
    },
  ]);

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
  };

  const handleCheckboxChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.checked });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (
      formData.phone &&
      !/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-()]/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    if (!formData.terms) {
      errors.terms = "You must accept the terms and conditions to continue";
    }

    return errors;
  };

  const simulateApiCall = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: Date.now() });
      }, 2000); // Simulate 2 second API call
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      // Simulate API call
      const result = await simulateApiCall();

      if (result.success) {
        // Add to submission history
        const newSubmission = {
          ...formData,
          id: result.id,
          submittedAt: new Date().toLocaleString(),
        };
        setSubmissionHistory((prev) => [newSubmission, ...prev]);

        // Add to table data
        const newUser = {
          id: result.id,
          name: formData.name,
          email: formData.email,
          role: "User",
          status: "Active",
        };
        setTableData((prev) => [...prev, newUser]);

        setModalContent(
          `Registration successful! Welcome, ${formData.name}! 
          Your account has been created and you've been added to the user table below.
          ${formData.newsletter ? " You will receive our newsletter." : ""}`
        );
        setIsModalOpen(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          newsletter: false,
          terms: false,
        });
      }
    } catch {
      setModalContent("Registration failed. Please try again.");
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (row) => {
    setModalContent(`Editing user: ${row.name} (${row.email})`);
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setTableData(tableData.filter((item) => item.id !== row.id));
    setModalContent(`User ${row.name} has been deleted successfully.`);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />

      <div className="pt-24 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div id="docs" className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-blue-500 dark:text-blue-400 mr-3" />
              <h1 className="text-4xl font-bold text-gradient">
                ReactCraft UI
              </h1>
              <Sparkles className="w-8 h-8 text-purple-500 dark:text-purple-400 ml-3" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
              Modern React Components with Glassmorphism & Dark Mode
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Interactive showcase of 6 reusable components: Form, Input,
              Button, Checkbox, DataTable, and Modal
            </p>
          </div>

          <div
            id="components"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Form Section */}
            <Form
              title="User Registration Form"
              onSubmit={handleFormSubmit}
              isSubmitting={isSubmitting}
            >
              <Input
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange("name")}
                placeholder="Enter your full name"
                error={formErrors.name}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                placeholder="Enter your email"
                error={formErrors.email}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                placeholder="Enter your phone number (optional)"
                error={formErrors.phone}
                icon={<Search size={16} className="text-gray-400" />}
              />

              <div className="space-y-3">
                <Checkbox
                  label="Subscribe to newsletter"
                  description="Get updates about new features and promotions"
                  checked={formData.newsletter}
                  onChange={handleCheckboxChange("newsletter")}
                  disabled={isSubmitting}
                />

                <Checkbox
                  label="Accept Terms and Conditions"
                  description="Required to create an account"
                  checked={formData.terms}
                  onChange={handleCheckboxChange("terms")}
                  disabled={isSubmitting}
                />
                {formErrors.terms && (
                  <p className="text-sm text-red-600 ml-7">
                    {formErrors.terms}
                  </p>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  onClick={handleFormSubmit}
                  variant="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
                <Button
                  variant="secondary"
                  disabled={isSubmitting}
                  onClick={() => {
                    setFormData({
                      name: "",
                      email: "",
                      phone: "",
                      newsletter: false,
                      terms: false,
                    });
                    setFormErrors({});
                  }}
                >
                  Clear Form
                </Button>
              </div>

              {/* Real-time form status */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-md">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Form Status:
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-300 space-y-1">
                  <div>Name: {formData.name ? "✓ Valid" : "⚠ Required"}</div>
                  <div>
                    Email:{" "}
                    {formData.email &&
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
                      ? "✓ Valid"
                      : "⚠ Required/Invalid"}
                  </div>
                  <div>
                    Terms: {formData.terms ? "✓ Accepted" : "⚠ Must accept"}
                  </div>
                  <div>
                    Form Ready:{" "}
                    {validateForm() && Object.keys(validateForm()).length === 0
                      ? "✓ Ready"
                      : "⚠ Has errors"}
                  </div>
                </div>
              </div>
            </Form>

            {/* Button Showcase */}
            <div className="glass p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Button Variants
              </h2>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                </div>

                <div className="flex flex-wrap gap-3 items-end">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button disabled>Disabled</Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setModalContent(
                        "Button clicked! This demonstrates the modal component."
                      );
                      setIsModalOpen(true);
                    }}
                  >
                    Open Modal
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Table Section */}
          <div
            id="examples"
            className="mt-8 glass p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  User Management Table
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Click column headers to sort. Use action buttons to edit or
                  delete users.
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total Users: {tableData.length}
              </div>
            </div>
            <DataTable
              columns={columns}
              data={tableData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>

          {/* Submission History */}
          {submissionHistory.length > 0 && (
            <div
              id="submissions"
              className="mt-8 glass p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800"
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Submissions
              </h2>
              <div className="space-y-3">
                {submissionHistory.slice(0, 5).map((submission) => (
                  <div
                    key={submission.id}
                    className="border-l-4 border-green-500 dark:border-green-400 pl-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-r-md"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {submission.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {submission.email}
                        </p>
                        {submission.phone && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Phone: {submission.phone}
                          </p>
                        )}
                        <div className="flex space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>
                            Newsletter: {submission.newsletter ? "Yes" : "No"}
                          </span>
                          <span>
                            Terms:{" "}
                            {submission.terms ? "Accepted" : "Not Accepted"}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {submission.submittedAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Notification"
            size="md"
          >
            <div className="py-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Check className="h-6 w-6 text-green-500 dark:text-green-400" />
                </div>
                <p className="text-gray-800 dark:text-gray-200">
                  {modalContent}
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
};

export default App;
