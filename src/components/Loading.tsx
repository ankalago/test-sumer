import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RefreshIcon as RefreshIconOutline } from '@heroicons/react/outline'
import useStore from '../hooks/hookStore';

const Loading = (): JSX.Element => {

  const { ui } = useStore();
  const { loading } = ui

  return (
    <Transition.Root show={loading} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => {}}>
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-300 bg-opacity-50 transition-opacity" />
          </Transition.Child>
          <div className="inline-block rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden transform transition-all">
            <RefreshIconOutline className="animate-spin h-10 w-10 text-white min-h-screen" aria-hidden="true"/>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Loading;
