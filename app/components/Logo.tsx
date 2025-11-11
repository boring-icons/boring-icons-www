export default function Logo() {
  return(
    <div className="h-16 w-16 p-2 rounded-xl bg-logo-bg">
      <svg className="stroke-logo-icon" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M16 34.0001H32M24 19C24 22 20.4183 26 16 26C11.5817 26 8 23.2 8 18V14.0001H40V18C40 23.2 36.4183 26 32 26C27.5817 26 24 22 24 19Z" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}