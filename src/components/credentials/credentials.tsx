const CREDENTIALS = [
  {
    href: "https://www.linkedin.com/in/dmitrii-vasilev-ykt/",
    icon: "fab fa-linkedin",
  },
  {
    href: "https://github.com/Digitalk14",
    icon: "fab fa-github",
  },
  {
    href: "https://digitalk14.github.io/portfolio_akmid/",
    icon: "fas fa-globe",
  },
];

export const Credentials = () => {
  return (
    <div className="flex gap-4 items-center">
      {CREDENTIALS.map((credential) => (
        <a
          key={credential.href}
          href={credential.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-gray-600 dark:text-[#666] dark:hover:text-[#ddd]"
        >
          <i className={credential.icon} />
        </a>
      ))}
    </div>
  );
};