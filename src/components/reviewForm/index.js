import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import { getGenres } from "../../api/tmdb-api";

const ReviewForm = ({ movie }) => {
  const defaultValues = {
    author: "",
    review: "",
    agree: false,
    rating: "3",
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);
  const navigate = useNavigate();
  //const context = useContext(MoviesContext);
  const [genre, setGenre] = useState(3);
  const genres = getGenres();


  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const onSubmit = (movie) => {
    movie.movieId = movie.id;
    movie.genre = genre;
  //  context.addReview(movie, review);
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Make your own movie!
      </Typography>
      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="author"
          control={control}
          rules={{ required: "Name is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="title"
              label="Movie Title"
              autoFocus
            />
          )}
        />
        {errors.author && (
          <Typography variant="h6" component="p">
            {errors.author.message}
          </Typography>
        )}
        <Controller
          name="review"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: { value: 10, message: "Review is too short" },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={value}
              onChange={onChange}
              label="Overview"
              id="overview"
              multiline
              minRows={10}
            />
          )}
        />
        {errors.review && (
          <Typography variant="h6" component="p">
            {errors.review.message}
          </Typography>
        )}

        <Controller
          control={control}
          name="genre"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="select-genre"
              select
              variant="outlined"
              label="Genre Select"
              value={genre}
              onChange={handleGenreChange}
              helperText="Don't forget the genre!"
            >
              {genres.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box sx={styles.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={styles.submit}
          >
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset({
                author: "",
                content: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;