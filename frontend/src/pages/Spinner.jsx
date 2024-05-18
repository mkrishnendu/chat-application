import React from 'react'

export const Spinner = () => {
  return (
    <div className='d-flex justify-content-center mt-4'>
  <div class="spinner-grow text-primary" role="status">
  <span class="sr-only">...</span>
</div>
<div class="spinner-grow text-secondary" role="status">
  <span class="sr-only">...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="sr-only">...</span>
</div>
<div class="spinner-grow text-danger" role="status">
  <span class="sr-only">...</span>
</div>
<div class="spinner-grow text-warning" role="status">
  <span class="sr-only">...</span>
</div>
<div class="spinner-grow text-info" role="status">
  <span class="sr-only"></span>
</div>
<div class="spinner-grow text-light" role="status">
  <span class="sr-only"></span>
</div>
<div class="spinner-grow text-dark" role="status">
  <span class="sr-only">...</span>
</div>
    </div>
  )
}
