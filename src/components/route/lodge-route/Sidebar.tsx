import { GitHubLogoIcon, LinkedInLogoIcon, LinkNone2Icon, MixIcon } from '@radix-ui/react-icons';
import { MailIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

function Sidebar() {
  return (
    <aside className="sm:flex hidden pt-14 flex-col w-64 h-full  fixed top-0 left-0 border-r border-border">
      {/* Scrollable Content */}
      <ScrollArea className="flex-grow p-6">
        {/* Logo/Intro Section */}
        <div className="mb-6">
          <Badge className="bg-accent text-xs mb-3">
            <span className="font-medium">Note:</span> Lodge images are temporary and will be updated soon.
          </Badge>
          
        </div>
        <Separator />

        {/* Categories Section */}
        <div className="mt-6">
          <h2 className="font-semibold tracking-wide text-base flex items-center gap-2 text-foreground">
            <MixIcon className="text-primary w-5 h-5" />
            Category
          </h2>
          <ul className="pl-6 mt-3 space-y-2">
            {['Boys', 'Girls', 'Families'].map((category, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors"
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <Separator className="my-6" />

        {/* Popular Places Section */}
        <div>
          <h2 className="font-semibold tracking-wide text-base flex items-center gap-2 text-foreground">
            <LinkNone2Icon className="text-primary w-5 h-5" />
            Popular Places
          </h2>
          <ul className="pl-6 mt-3 space-y-2">
            {[
              'Matwari',
              'Babugaon',
              'Nutan Nagar',
              'Lakhe',
              'Zabara',
              'Lochan Path',
              'More',
            ].map((place, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors"
              >
                {place}
              </li>
            ))}
          </ul>
        </div>
      </ScrollArea>

      {/* Footer Section */}
      <div className="p-6">
        <Separator className="mb-4" />
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MailIcon className="text-primary w-5 h-5" />
            <p className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors">
              subodh14329@gmail.com
            </p>
          </div>
          <Link
            href="https://github.com/1432Subodh"
            target="_blank"
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <GitHubLogoIcon className="text-primary w-5 h-5" />
            Github
          </Link>
          <Link
            href="https://www.linkedin.com/in/subodhravidas/"
            target="_blank"
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <LinkedInLogoIcon className="text-primary w-5 h-5" />
            LinkedIn
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
