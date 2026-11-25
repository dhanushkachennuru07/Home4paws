
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const defaultPets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Golden Retriever",
    age: "2 Years",
    location: "Vijayawada",
    image: "/legacy/images/dog1.jpg",
    health: "Healthy and vaccinated."
  },
  {
    id: 2,
    name: "Rocky",
    type: "Dog",
    breed: "Labrador",
    age: "3 Years",
    location: "Hyderabad",
    image: "/legacy/images/dog2.jpg",
    health: "Healthy and playful."
  },
  {
    id: 3,
    name: "Max",
    type: "Dog",
    breed: "Beagle",
    age: "1 Year",
    location: "Guntur",
    image: "/legacy/images/dog3.avif",
    health: "Friendly and healthy."
  },
  {
    id: 4,
    name: "Luna",
    type: "Cat",
    breed: "Persian Cat",
    age: "2 Years",
    location: "Chennai",
    image: "/legacy/images/cat1.webp",
    health: "Calm and vaccinated."
  },
  {
    id: 5,
    name: "Coco",
    type: "Other",
    breed: "Rabbit",
    age: "8 Months",
    location: "Bengaluru",
    image: "/legacy/images/rabbit1.jpg",
    health: "Healthy and gentle."
  },
  {
    id: 6,
    name: "Hope",
    type: "Special Needs",
    breed: "Indie Dog",
    age: "4 Years",
    location: "Tenali",
    image: "/legacy/images/specialdog.jpeg",
    health: "Needs extra care."
  },
  {
    id: 7,
    name: "Milo",
    type: "Cat",
    breed: "Cute Cat",
    age: "1 Year",
    location: "Vijayawada",
    image: "/legacy/images/cat2.jpg",
    health: "Healthy and friendly."
  }
];

const emptyForm = {
  name: "",
  type: "Dog",
  breed: "",
  age: "",
  location: "",
  image: "",
  health: ""
};

function ManagePets() {
  const [pets, setPets] = useState(() => {
    return JSON.parse(localStorage.getItem("pets") || "null") || defaultPets;
  });

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "/admin-login";
    return null;
  }

  function savePets(updatedPets) {
    setPets(updatedPets);
    localStorage.setItem("pets", JSON.stringify(updatedPets));
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }
  function handleImageChange(e) {
  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select a valid image.");
    return;
  }

  // Keep image size below 1 MB
  if (file.size > 1024 * 1024) {
    alert("Please select an image smaller than 1 MB.");
    e.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    setForm((previous) => ({
      ...previous,
      image: reader.result
    }));
  };

  reader.readAsDataURL(file);
}

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(pet) {
    setForm({
      name: pet.name || "",
      type: pet.type || "Dog",
      breed: pet.breed || "",
      age: pet.age || "",
      location: pet.location || "",
      image: pet.image || "",
      health: pet.health || ""
    });

    setEditingId(pet.id);
    setShowForm(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter the pet name.");
      return;
    }

    if (editingId !== null) {
      const updatedPets = pets.map((pet) =>
        pet.id === editingId
          ? { ...form, name: form.name.trim(), id: editingId }
          : pet
      );

      savePets(updatedPets);
      alert("Pet details updated successfully!");
    } else {
      const newPet = {
        ...form,
        name: form.name.trim(),
        id: Date.now()
      };

      savePets([...pets, newPet]);
      alert("New pet added successfully!");
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function deletePet(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pet?"
    );

    if (!confirmDelete) return;

    const updatedPets = pets.filter((pet) => pet.id !== id);

    savePets(updatedPets);
    alert("Pet deleted successfully!");
  }

  const filteredPets = pets.filter((pet) =>
    `${pet.name} ${pet.breed} ${pet.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Header />

      <main className="manage-pets-page">

        <div className="manage-pets-heading">
          <div>
            <p className="tag">HOME4PAWS ADMINISTRATION</p>
            <h1>Manage Pets 🐾</h1>
            <p>Add, edit and manage pets available for adoption.</p>
          </div>

          <button
            className="add-pet-btn"
            onClick={openAddForm}
          >
            + Add New Pet
          </button>
        </div>

        <div className="manage-pets-summary">
          <h2>{pets.length}</h2>
          <p>Total Pets Listed</p>
        </div>

        {showForm && (
          <section className="pet-form-card">

            <div className="pet-form-heading">
              <h2>
                {editingId !== null ? "Edit Pet Details" : "Add New Pet"}
              </h2>

              <button
                type="button"
                className="close-form-btn"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="pet-form-grid">

                <div className="pet-form-field">
                  <label htmlFor="pet-name">Pet Name</label>
                  <input
                    id="pet-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter pet name"
                    required
                  />
                </div>

                <div className="pet-form-field">
  <label>Upload Pet Image</label>

  <input
    type="file"
    accept="image/png, image/jpeg, image/webp"
    onChange={handleImageChange}
    required={!form.image}
  />

  {form.image && (
    <div className="pet-image-preview">
      <img src={form.image} alt="Pet Preview" />
      <p>Selected Pet Image</p>
    </div>
  )}
</div>

                <div className="pet-form-field">
                  <label>Pet Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Other">Other</option>
                    <option value="Special Needs">Special Needs</option>
                  </select>
                </div>

                <div className="pet-form-field">
                  <label>Breed</label>
                  <input
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                    placeholder="Enter breed"
                    required
                  />
                </div>

                <div className="pet-form-field">
                  <label>Age</label>
                  <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Example: 2 Years"
                    required
                  />
                </div>

                <div className="pet-form-field">
                  <label>Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    required
                  />
                </div>

              

                <div className="pet-form-field full-width">
                  <label>Health Details</label>
                  <textarea
                    name="health"
                    value={form.health}
                    onChange={handleChange}
                    placeholder="Enter pet health information"
                    required
                  />
                </div>

              </div>

              <div className="pet-form-actions">
                <button type="submit" className="save-pet-btn">
                  {editingId !== null ? "Update Pet" : "Add Pet"}
                </button>

                <button
                  type="button"
                  className="cancel-pet-btn"
                  onClick={() => {
                    setShowForm(false);
                    setForm(emptyForm);
                    setEditingId(null);
                  }}
                >
                  Cancel
                </button>
              </div>

            </form>
          </section>
        )}

        <div className="manage-pets-list-heading">
          <h2>All Pets</h2>

          <input
            className="manage-pets-search"
            placeholder="Search by name, breed or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredPets.length === 0 ? (
          <div className="manage-pets-empty">
            <h3>No pets found</h3>
            <p>Try another search or add a new pet.</p>
          </div>
        ) : (
          <div className="manage-pets-grid">

            {filteredPets.map((pet) => (
              <article className="manage-pet-card" key={pet.id}>

                <img
                  src={
                    pet.image?.startsWith("images/")
                      ? `/legacy/${pet.image}`
                      : pet.image
                  }
                  alt={pet.name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

                <div className="manage-pet-details">
                  <span className="pet-type-label">{pet.type}</span>

                  <h3>{pet.name}</h3>

                  <p><strong>Breed:</strong> {pet.breed}</p>
                  <p><strong>Age:</strong> {pet.age}</p>
                  <p><strong>Location:</strong> {pet.location}</p>
                  <p><strong>Health:</strong> {pet.health}</p>

                  <div className="manage-pet-actions">

                    <button
                      className="edit-pet-btn"
                      onClick={() => openEditForm(pet)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-pet-btn"
                      onClick={() => deletePet(pet.id)}
                    >
                      Delete
                    </button>

                  </div>
                </div>

              </article>
            ))}

          </div>
        )}

      </main>

      <Footer />
    </>
  );
}

export default ManagePets;
